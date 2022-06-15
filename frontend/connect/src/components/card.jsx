import { useState } from "react"
// Component CSS style
require("../css/card.css")


function Card(props) {
  // Destructure the props
  const { name, email, imgSrc, setMakeChanges } = props;

  // Create FormData object
  const formData = new FormData();
  // To upload the image to the backend server
  async function uploadImage(formData) {
    try {
      const res = await fetch('http://localhost:5000/imgpost', {
        method: "POST",
        body: formData
      });
      // Send the response body
      return res.json();
    } catch (error) {
      // Log the error message
      console.log(error);
    }
  };

  // Default image URL
  const [dImgSrc, setDImgSrc] = useState(
    "https://png.pngitem.com/pimgs/s/41-414928_face-head-line-art-clip-and-white-symbol.png");

  // Helper func() to read the image data and upload the image
  // to the backedn server
  const Helper = (e) => {
    // Take the file
    const file = e.target.files[0];
    // Intialize the reader object from FileReader class
    const reader = new FileReader();
    // Add addEventListener "loader"
    reader.addEventListener("load", () => {
      console.log(reader.result);
    });
    // Check if the file is available to upload and read
    if (file) {
      try {
        // Read the file as Base64 Data URL
        reader.readAsDataURL(file);
        // Add Image to the formData
        formData.append("image", file);
        formData.append("email", email);
      } catch (error) {
        // Log the error if there is an error
        console.log("error");
      }
    }
  };

  // Upload the Image 
  const onUploadImage = (e) => {
    e.preventDefault();
    //Upload the Image
    uploadImage(formData).then(data => {
      if (data) {
        console.log(data);
        setMakeChanges(true);
      } else {
        console.log("Not uploaded");
        setMakeChanges(true);
      }
    }).catch(error => {
      console.log(error);
    })
  };

  // Return the main Component
  return (
    <div className="poster">
      <div className="outer-box">
        <h2 className="name">{name}</h2>
        <p className="info">{email}</p>
        <div>
          <img id="photo" src={!!imgSrc ? imgSrc : dImgSrc} alt="userphoto" />
          <form>
            <div style={{ "display": "block", "padding": "20px" }}>
              <div>
                <input type="file" id="file" onChange={Helper} />
                <label htmlFor="file" id="uploadbtn">Browse</label>
              </div>
              <button id="uploadbtn" onClick={onUploadImage}>Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
