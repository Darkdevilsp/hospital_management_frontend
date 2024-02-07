import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./doctorSignup.css"


function DoctorSignup(props) {
    const [name1, setName1] = useState("");
    const [username1, setUsername1] = useState("");
    const [password1, setPassword1] = useState("");
    const navigate = useNavigate();
    const {user,setUser}=props

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/doctorSignup", {
                name: name1,
                username: username1,
                password: password1,
            });

            const ans = response.data;
            console.log("ans: " + ans);

            if (ans === "User already exists") {
                alert(ans);
            } else if (ans === "Added successfully") {
                alert(ans);
                navigate('/doctorLogin');
            } else {
                alert(ans);
            }
        } catch (err) {
            console.error("Error during signup:", err);
            if (err.response) {
                if (err.response.status === 409) {
                    alert("User with the same username already exists");
                } else {
                    console.error("Server responded with:", err.response.data);
                }
            }
        }
    }

    function handlePassword(x) {
        setPassword1(x);
    }

    function handleUsername(x) {
        setUsername1(x);
    }

    function handleName(x) {
        setName1(x);
    }

    return (
        <div>
            {user==="None"?
                <div className={"signupBox"}>
                    <h2>Doctor Signup</h2>
                    <div className={"signform-container"}>
                    <form className={"signup"}>
                        <label>
                            Name:<br />
                            <input type={"text"} value={name1} placeholder={"Enter your name"} onChange={(e) => handleName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Username:<br />
                            <input type="text" placeholder={"Enter username"} value={username1} onChange={(e) => handleUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:<br />
                            <input type="password" placeholder={"Enter password"} value={password1} onChange={(e) => handlePassword(e.target.value)} />
                        </label>
                        <br />
                        <button type="button" onClick={handleSignup}>
                            SIGNUP
                        </button>
                        <br />
                        Already have an account? <Link to={"/doctorLogin"}>LOGIN</Link>
                    </form>
                    </div>
                </div>
                :
                user==="doctor"?
                    <p>You have already logged in</p>
                    :
                    <p>You dont have access to this page</p>
            }
        </div>
    );
}

export default DoctorSignup;
