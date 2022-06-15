import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import {ReactDom} from "react-dom"
import "../css/register.css"

function Register(){
   const navigate=useNavigate();
   const[data,setdata]=useState({
     name:"",gender:"",email:"",password:"",cpassword:"" 
   })
   
  const handleEvent=(event)=>{
   var name=event.target.name;
   var value=event.target.value;
    setdata({...data,[name]:value})
}
   const Postdata=async(e)=>{
    
    e.preventDefault();
    const{name,email,gender,password,cpassword}=data;
    if(!name||!email||!gender||!password||!cpassword){
      alert("fill all the details asked") 
    }
    const res=await fetch("/register",{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         name,email,gender,password,cpassword
      }) 
    })
    const user=await res.json();
    if(user.status===200){
      window.alert("sucess") 
    }
  
    if(user.status===401 ){
       alert("user already registerd")
    }
    else if(user.status===400){
      alert("registration unsucessful") 
    }
    else if(user.status===402){
      alert("some error occured"); 
    }
    else{
      window.alert("registration successful");
      navigate("/login") 
    }
   }

   return(
<div className="super-reg" >
    <div className="main-cntnt">
<h3>
   so congrats your story starts from here,just 
   give your some basic details so that 
   you can be showcased upto the best on
   our portal it will hardly take a minute.
   </h3>
<img src="frontend\connect\src\img\jakob-owens-pGaZS_HjUH0-unsplash.jpg" alt="" srcset="" />
    </div>
    <div className="main-form">
       <form  method="post">
        <h2>what we should call you?</h2>
        <input type="text" placeholder=" full name" name="name" value={data.name} onChange={handleEvent}/> <br />
        <h2>how you want to be identified!</h2>
        <input type="text" placeholder="gender" name="gender" value={data.gender} onChange={handleEvent}/>
         <br />
        <h2> email id</h2>
        <input type="text" placeholder="email id" name="email" value={data.email} onChange={handleEvent}/> <br />
        <h2>create password</h2>
        
        <input type="password" placeholder="password" name="password" value={data.password} onChange={handleEvent}/> <br />
        <h2>confirm password</h2>
         <input type="password" placeholder="password" name="cpassword" value={data.cpassword}
         onChange={handleEvent}
         /> <br />
         <button type="submit" onClick={Postdata} className="reg-frm-btn">ready</button>
         </form>
    </div>
</div>
   );
}
export default Register;