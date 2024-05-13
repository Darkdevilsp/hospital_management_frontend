import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from '@mui/material';



function ManagementSignup(props) {
    const [name2, setName2] = useState()
    const [username2, setUsername2] = useState()
    const [password2, setPassword2] = useState()
    const navigate = useNavigate();
    const { user, setUser } = props

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/managementSignup", {
                name: name2,
                username: username2,
                password: password2,
            });

            const ans = response.data;
            console.log("ans: " + ans);

            if (ans === "User already exists") {
                alert(ans);
            } else if (ans === "Added successfully") {
                alert(ans);
                navigate('/managementLogin');
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
        setPassword2(x);
    }

    function handleUsername(x) {
        setUsername2(x);
    }

    function handleName(x) {
        setName2(x);
    }

    return (
        <div>
            {user === "Admin" ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            padding: '20px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            MANAGEMENT SIGNUP
                        </Typography>
                        <Box className="signform-container">
                            <form className="signup">
                                <TextField
                                    label="Name"
                                    type="text"
                                    value={name2}
                                    placeholder="Enter your name"
                                    onChange={(e) => handleName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Username"
                                    type="text"
                                    value={username2}
                                    placeholder="Enter username"
                                    onChange={(e) => handleUsername(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password2}
                                    placeholder="Enter password"
                                    onChange={(e) => handlePassword(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSignup}
                                    fullWidth
                                    sx={{ marginTop: '20px' }}
                                >
                                    SIGNUP
                                </Button>
                                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                    Already have an account?{' '}
                                    <Link to="/managementLogin" style={{ textDecoration: 'none' }}>
                                        LOGIN
                                    </Link>
                                </Typography>
                            </form>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    Only admins have access to this page
                </Typography>
            )}
        </div>
    );
}
export default ManagementSignup