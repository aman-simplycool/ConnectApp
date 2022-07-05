// Component CSS style
require("../css/card.css")


function Card(props) {
  // Destructure the props
  const { name, email, imgSrc, setMakeChanges, formData, setFormData } = props;
  const defaultImgSrc = "https://png.pngitem.com/pimgs/s/41-414928_face-head-line-art-clip-and-white-symbol.png";

  // To upload the image to the backend server
  async function uploadImage() {
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

  // Helper func() to read the image data and upload the image
  // to the backedn server
  const Helper = (e) => {
    // Take the file
    const file = e.target.files[0];
    // Intialize the reader object from FileReader class
    // const reader = new FileReader();
    // Add addEventListener "loader"
    // reader.addEventListener("load", () => {
    //   console.log(reader.result);
    // });
    // Check if the file is available to upload and read
    if (file) {
      try {
        // Read the file as Base64 Data URL
        // reader.readAsDataURL(file);
        // Add Image to the formData
        const fd = new FormData();
        fd.append("image", file);
        setFormData(fd);
      } catch (error) {
        // Log the error if there is an error
        console.log("error");
      }
    }
  };

  // Upload the Image 
  const onUploadImage = (e) => {
    e.preventDefault();
    // Add email to formData
    setFormData(formData.append("email", email));
    //Upload the Image
    uploadImage().then(data => {
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
        <h2 style={{ "textTransform": "capitalize" }} className="name">{name}</h2>
        <p className="info">{"Email: " + email}</p>
        <div>
          <img
            id="photo"
            width={"200px"}
            height={"200px"}
            src={!!imgSrc ? imgSrc : defaultImgSrc}
            alt="userphoto"
            style={{ "borderRadius": "50%", "boxShadow": "0 0 8px #000" }}
          />
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
