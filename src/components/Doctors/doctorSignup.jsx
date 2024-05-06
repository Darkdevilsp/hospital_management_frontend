import React, { useState } from "react";
import axios from "axios";
import doctorImage from "../../utils/loginpage.png";
import "./doctorSignup.css";
import { useNavigate } from "react-router-dom"; // Import your CSS file
import { Box, Container, TextField, Button, Typography } from '@mui/material'; // Import Material-UI components


const genders = ["Male", "Female"];

const DoctorSignup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/doctorSignup", {
                name: name,
                age: age,
                gender: gender,
                phoneNo: phoneNo,
                address: address,
                designation: designation,
                email: email,
                password: password,
            });
            const ans = response.data;
            console.log(ans);
            if (ans === "Added successfully") {
                alert(ans)
                navigate("/m-doctors");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            if (error.response) {
                if (error.response.status === 409) {
                    alert("User with the same username already exists");
                } else {
                    console.error("Server responded with:", error.response.data);
                }
            }
        }
    };

    return (
        <div className="signupContainer" style={{
            backgroundImage: `url(${doctorImage})`,
        }}>
            <form className="signupForm" onSubmit={handleSubmit}>
                <h2 className="signupHeading">ADD DOCTOR</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="signupInput"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="signupInput"
                    required
                />
                <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="signupInput"
                    style={{
                        paddingTop: '10px',
                        marginTop: '0px',
                        marginBottom: '15px',
                        marginLeft: '0px',
                        fontSize: '15px',
                        opacity: '0.6'

                    }}
                >
                    {genders.map((gender) => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                    ))}
                </select>

                <input
                    type="tel"
                    name="phoneNo"
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="signupInput"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="signupInput"
                    required
                />
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="signupInput"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signupInput"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signupInput"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    SIGN UP
                </Button>
            </form>
        </div>
    );
};

export default DoctorSignup;
