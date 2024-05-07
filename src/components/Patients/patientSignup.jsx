import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material'; // Import Material-UI components
import doctorImage from "../../utils/loginpage.png"; // Import your background image

function PatientSignup(props) {
    const { user, setUser } = props;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/patientSignup", {
                name: name,
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

    return (
        <div style={{
            backgroundImage: `url(${doctorImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '92vh',
            fontFamily: 'Arial Narrow, sans-serif'}}>
            {user === "None" ?
                <div className="signupBox">
                    <Typography variant="h4">PATIENT SIGNUP</Typography>
                    <Container maxWidth="sm">
                        <Box
                            sx={{
                                width: '80%',
                                background: 'white',
                                padding: '20px',
                                marginTop: '20px',
                                position: 'relative',
                                left: '400px',
                                textAlign: 'center',
                                color: 'black'
                            }}
                        >
                            <form>
                                <TextField
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Phone Number"
                                    type="text"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <Select
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    fullWidth
                                    displayEmpty
                                    sx={{ marginBottom: '20px' }}
                                >
                                    <MenuItem value="" disabled>
                                        Select blood group
                                    </MenuItem>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                </Select>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleSignup}
                                >
                                    SIGNUP
                                </Button>
                                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                                    Already have an account? <Link to="/patientLogin">LOGIN</Link>
                                </Typography>
                            </form>
                        </Box>
                    </Container>
                </div>
                :
                user === "patient" ?
                    <Typography variant="body1">You have already logged in</Typography>
                    :
                    <Typography variant="body1">You are not a patient. Go back to your dashboard.</Typography>
            }
        </div>
    );
}

export default PatientSignup;
