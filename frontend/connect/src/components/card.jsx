import react, { useState } from "react"
require("../css/card.css")


function Card(props) {

  const { name, email, imgSrc, setMakeChanges } = props;

  const formData = new FormData();
  // To upload the image to the backend server
  async function uploadImage() {
    try {
      const res = await fetch('http://localhost:5000/imgpost', {
        method: "POST",
        body: formData
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const[dImgSrc, setDImgSrc] = useState("https://png.pngitem.com/pimgs/s/41-414928_face-head-line-art-clip-and-white-symbol.png");


  // Header to read the image data and upload the image
  const Helper = (email) => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(email);

    reader.addEventListener("load", () => {
      setDImgSrc(reader.result);
    });

    if (file) {
      try {
        reader.readAsDataURL(file);
        formData.append("image", file);
        formData.append("email", email);
        uploadImage().then((data) => {
          console.log(data);
          setMakeChanges(true);
        })
      } catch (error) {
        console.log("error");
      }
    }
  }

  return (
    <div className="poster">
      <div className="outer-box">
        <h2 className="name">{name}</h2>
        {/* <div className="bottom col-4"> */}
        <p className="info">{email}</p>
        <div>  <img id="photo" src={!!imgSrc ? imgSrc : dImgSrc} />
          <input type="file" id="file" onChange={Helper(email)} />
          <label for="file" id="uploadbtn">Profile</label>
        </div>
      </div>
    </div>
  );
}

export default Card;
