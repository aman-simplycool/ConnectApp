import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/home"
import Register from "./components/register"
import Navbar from "./components/navbar";
import Login from "./components/login"
import AboutUs from "./components/aboutus";
import User from "./components/users"
import Logout from "./components/logout";
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Register" exact element={<Register />} />
        {/* <Route path='/AboutUs' exact element={<AboutUs />} /> */}
        <Route path='/User' exact element={<User />}/>
        <Route path='/Logout' exact element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
