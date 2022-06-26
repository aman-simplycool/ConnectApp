import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
const Logout=()=>{
    const navigate=useNavigate();
  useEffect(()=>{
    fetch('/logout',{
        method:"GET",
        headers:{
        Accept:"application/json", 
        "Content-Type":"application/json",
        } 
        }).then((res)=>{
          if(res.status!=200){
           alert("some err occured") 
          }
          navigate('/')
        }).catch((err)=>{
          alert("some serious err is there")
        })
  })

    return(
 <div>
<h2>logout page </h2>
 </div>
   ); 
}
export default Logout;