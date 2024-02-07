import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './patientsignup.css';
function PatientSignup(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user,setUser}=props

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/patientSignup", {
                name: name,
                username: username,
                password: password,
            });

            const ans = response.data;
            console.log("ans: " + ans);

            if (ans === "User already exists") {
                alert(ans);
            } else if (ans === "Added successfully") {
                alert(ans);
                navigate('/patientLogin');
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
        setPassword(x);
    }

    function handleUsername(x) {
        setUsername(x);
    }

    function handleName(x) {
        setName(x);
    }

    return (
        <div>
            {user==="None"?

        <div className={"signupBox"}>
            <h2>PATIENT SIGNUP</h2>
            <div className={"signform-container"}>
            <form className={"signup"}>
                <label>
                    Name:<br />
                    <input type={"text"} value={name} placeholder={"Enter your name"} onChange={(e) => handleName(e.target.value)} />
                </label>
                <br />
                <label>
                    Username:<br />
                    <input type="text" placeholder={"Enter username"} value={username} onChange={(e) => handleUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:<br />
                    <input type="password" placeholder={"Enter password"} value={password} onChange={(e) => handlePassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleSignup}>
                    SIGNUP
                </button>
                <br />
                Already have an account? <Link to={"/patientLogin"}>LOGIN</Link>
            </form>
            </div>
        </div>
                :
                user==="patient"?
                <p>you have already logged in</p>
                    :
                    <p>You are not a patient go back to you dashboard</p>
            }
        </div>
    );
}

export default PatientSignup;
