import React, { useState } from "react"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "../css/login.css"
function Login(){
   
    const[data,setdata]=useState({
        email:"",password:""
    })
    const handleEvent=(event)=>{
    var name=event.target.name;
    var value=event.target.value;
    setdata({...data,[name]:value}) 
    }
    const postdata = async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch("/login",{
              method:"POST",
              headers:{
                 "Content-Type":"application/json"
              },
              body:JSON.stringify(data) 
            })
            const user = await res.json();
        
            if(res.status==200){
             alert("sucessful login") 
            Navigate("/User")
            }       
            else{
               alert("unsucessful"); 
            }
          
        }catch(err){
            console.log(err);
            alert(err)
        }
       
       }
    
    return(
<div className="main">
    <img src="/img/lggirl.png" alt="" />
    <div className="main-bg">
<div className="main-frm">
    <label for="email" id="email">email id</label> <br />
   <input type="text" placeholder="email" onChange={handleEvent} name="email" value={data.email}/> <br />
   <label for="password" id="password">password</label> <br />
   <input type="password" placeholder="password" name="password" onChange={handleEvent} value={data.password}/> <br /> 
   <button type="button" class="btn btn-outline-primary" onClick={postdata}>Submit</button>
</div>
</div>
</div>

    );
}
export default Login;