import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function PatientSignup(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = props;

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/patientSignup", {
                name: name,
                username: username,
                password: password,
                email: email,
                phoneNo: phoneNo,
                address: address,
                bloodGroup: bloodGroup
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

    function handleName(x) {
        setName(x);
    }

    function handleUsername(x) {
        setUsername(x);
    }

    function handlePassword(x) {
        setPassword(x);
    }

    function handleEmail(x) {
        setEmail(x);
    }

    function handlePhoneNo(x) {
        setPhoneNo(x);
    }

    function handleAddress(x) {
        setAddress(x);
    }

    function handleBloodGroup(x) {
        setBloodGroup(x);
    }

    return (
        <div>
            {user === "None" ?
                <div className={"signupBox"}>
                    <h2>PATIENT SIGNUP</h2>
                    <div className={"signform-container"}>
                        <form className={"signup"}>
                            <label>
                                Name:
                                <input type={"text"} value={name} placeholder={"Enter your name"} onChange={(e) => handleName(e.target.value)} />
                            </label>
                            <label>
                                Username:<br />
                                <input type="text" placeholder={"Enter username"} value={username} onChange={(e) => handleUsername(e.target.value)} />
                            </label>
                            <label>
                                Password:<br />
                                <input type="password" placeholder={"Enter password"} value={password} onChange={(e) => handlePassword(e.target.value)} />
                            </label>
                            <label>
                                Email:<br />
                                <input type="email" placeholder={"Enter email"} value={email} onChange={(e) => handleEmail(e.target.value)} />
                            </label>
                            <label>
                                Phone Number:<br />
                                <input type="text" placeholder={"Enter phone number"} value={phoneNo} onChange={(e) => handlePhoneNo(e.target.value)} />
                            </label>
                            <label>
                                Address:<br />
                                <input type="text" placeholder={"Enter address"} value={address} onChange={(e) => handleAddress(e.target.value)} />
                            </label>
                            <label>
                                Blood Group:<br />
                                <select value={bloodGroup} onChange={(e) => handleBloodGroup(e.target.value)}>
                                    <option value="">Select blood group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
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
                user === "patient" ?
                    <p>you have already logged in</p>
                    :
                    <p>You are not a patient go back to you dashboard</p>
            }
        </div>
    );
}

export default PatientSignup;
