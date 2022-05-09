import React, { useState } from "react"
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
    return(
<div className="main">
    <img src="/img/lggirl.png" alt="" />
    <div className="main-bg">
<div className="main-frm">
    <label for="email" id="email">email id</label> <br />
   <input type="text" placeholder="email" onChange={handleEvent} name="email" value={data.email}/> <br />
   <label for="password" id="password">password</label> <br />
   <input type="text" placeholder="password" name="password" onChange={handleEvent} value={data.password}/> <br /> 
   <button type="button" class="btn btn-outline-primary">Primary</button>
</div>
</div>
</div>

    );
}
export default Login;