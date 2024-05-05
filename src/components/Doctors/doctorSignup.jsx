import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function DoctorSignup() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [error, setError] = useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState()
    const navigate=useNavigate()

    async function handleSubmit() {
        try{
            const response = await axios.post("http://localhost:4000/doctorSignup", {
                name: name,
                age:age,
                gender:gender,
                email:email,
                phoneNo:phoneNo,
                address:address,
                designation:designation,
                password: password
            });

            const ans = response.data;
            console.log(ans)
            if (ans === "User already exists") {
                alert(ans);
            } else if (ans === "Added successfully") {
                alert(ans);

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

    return (
        <div className="container">
            <h1>Add Doctor</h1>
            {error && <p>{error}</p>}
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required/>
                </div>
                <div>
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required/>
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label>Designation:</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <label>Password</label>
                <input
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="button" onClick={handleSubmit}>
                    SIGNUP
                </button>
            </form>
        </div>
    );
}

export default DoctorSignup;
