import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import doctorImage from "../../utils/loginpage.png"

const genders = ["Male", "Female"];

const DoctorSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        phoneNo: "",
        address: "",
        designation: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:4000/doctorSignup", formData);
            const { data } = response;
            alert(data);
            if (data === "Added successfully") {
                navigate("/login"); // Redirect to login page after successful signup
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
        <Container className="signupContainer" style={{
            backgroundImage: `url(${doctorImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '92vh',
            maxWidth: '1600px'
        }}>
            <Box sx={{ width: '40%', background: 'white', padding: '5px 25px', marginTop: '20px', position: 'relative' }} component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ color: 'black', textAlign: 'center' }} gutterBottom>
                    ADD DOCTOR
                </Typography>
                <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <TextField
                    name="age"
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    margin="dense"
                    sx={{ width: '50%' }}
                    required
                />
                <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ float: 'right', position: 'absolute', top: '121px', marginLeft: '10px', width: '40%'}}

                >
                    {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    name="phoneNo"
                    label="Phone Number"
                    type="tel"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <TextField
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <TextField
                    name="designation"
                    label="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="dense"
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ marginTop: "10px" }} fullWidth>
                    SIGNUP
                </Button>
            </Box>
        </Container>
    );
};

export default DoctorSignup;
