import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
// card Component
import Card from "./card";
// Data fetch APIs
import getData from "./data";
// Component CSS style
import("../css/user.css");

// Component
function User() {
   const [data, setData] = useState([]);
   const [error, setError] = useState("");
   const [redirect, setRedirect] = useState(false);
   const [makeChanges, setMakeChanges] = useState(false);
   const [formData, setFormData] = useState(null);

   

   // Preload the data when page loads
   useEffect(() => {
      getData().then((docs) => {
         // If  there is a docs
         if (docs.error) {
            setError(docs.error)
            setRedirect(true)
         }
         else if (docs) {
            console.log(docs);
            setData(docs);
         }
         else if (!docs) {
            setRedirect(true)
         }
      }).catch((err) => {
         console.log(err);
      });
   }, [makeChanges]);

   // Return the main Component
   return (
      <div className="box-1">
         <h1>hello users</h1><br />
         <div className="box-2">
            {data.map((value, index) => (
               /* Card Component */
               <Card
                  key={index}
                  name={value.name}
                  gender={value.gender}
                  email={value.email}
                  imgSrc={value.imageurl}
                  setMakeChanges={setMakeChanges}
                  formData={formData}
                  setFormData={setFormData}
               />
            ))}
         </div>
      </div>
   );

}


export default User;