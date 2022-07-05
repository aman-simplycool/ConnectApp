import React, { useState } from "react"
import ReactDOM from "react"
import { FaUser, } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import Register from "./register"
import "../css/home.css"
function Home() {

    return (
        <div className="super">
            <div className="main-info">
                <h1>lets connect</h1>
                <p>"its not always easy to get yourself comfortable into a
                    <br /> new organization whether its college or any company <br /> with a person you want to talk
                    that's why we created  <br /> a platform where you can find folks of your organization <br />
                    get onboard to any new place through this application"
                </p>
                <br />
                --AMAN GUPTA
            </div>
            {/* // main box */}
            <div className="main-box">
                {/*div containing writing part and box*/}
                <div>
                    {/* input fields part
                <button type="button" class="btn btn-light">Light</button>
                <button type="button" class="btn btn-light">Light</button>
                <div className="main-cntnt">
                 <h3>username</h3>
                 <FaUser className="main-icn"/>
                    <input  name="username" type="text" placeholder="username" value={data.username} onChange={handlechange}/>
                    <h3>
                        password
                    </h3>
                    <RiLockPasswordFill/>
                    <input type="password" name="password" placeholder="password" value={data.password} onChange={handlechange}/>
                </div> */}


                    {/*here i called my registere functional component*/}

                </div>
            </div>
        </div>
    )
}
export default Home;