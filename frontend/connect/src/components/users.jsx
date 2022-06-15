import React, { useEffect, useState } from "react";
import Card from "./card";
import getData from "./data";
import("../css/user.css")
function User() {

   const [data, setData] = useState([])
   const [makeChanges, setMakeChanges] = useState(false);

   useEffect(() => {
      getData().then((docs) => {
         console.log(docs);
         if (docs) {
            setData(docs);
            console.log(data);
         }
         else if (!docs) {
            console.log("err occured")
         }
      }).
         catch((err) => {
            console.log(err);
         })
   }, [makeChanges]);

   return (
      <div className="box-1">
         <h1>hello users</h1><br />
         <div className="box-2">
            {data.map((value, index) => (
               <Card
                  key={index}
                  name={value.name}
                  gender={value.gender}
                  email={value.email}
                  imgSrc={value.imageurl}
                  setMakeChanges={setMakeChanges}
               />
            ))}
         </div>
      </div>
   )

}


export default User;