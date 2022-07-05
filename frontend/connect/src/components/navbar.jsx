import React,{ReactDom} from "react";
import { Link } from "react-router-dom";
import Home from "../components/home"
import Login from "./login";
import Register from "./register";
function Navbar(){
return(
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/">
  <a class="navbar-brand" >Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  </Link>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <Link to='/Login'>
      <li class="nav-item active">
        <a class="nav-link" >login<span class="sr-only">(current)</span></a>
      </li>
      </Link>
      <Link to="/Register">
      <li class="nav-item active">
        <a class="nav-link">register</a>
      </li>
      </Link>
      <Link to="/User">
      <li class="nav-item active">
        <a class="nav-link">User</a>
      </li>
      </Link>
      <Link to="/Logout">
      <li class="nav-item active">
        <a class="nav-link">Logout</a>
      </li>
      </Link>
      
      {/* <li class="nav-item active">
        <a class="nav-link">about us</a>
      </li> */}
    </ul>
  </div>
</nav>
);
}
export default Navbar;