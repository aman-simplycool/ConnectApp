import React from "react";
const getData = async ()=>{
    try {
        const res=  await fetch("/data",{
            method:"GET",
            headers:{
               "Content-Type":"application/json" 
            }
        }  
        )
        console.log(res);
        return res.json()
    } catch (error) {
        console.log(error);
        alert("some err occured")
    }
        
}
export default getData

      


