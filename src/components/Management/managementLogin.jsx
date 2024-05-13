import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import doctorImage from "../../utils/loginpage.png";
import { Box, Container, TextField, Button, Typography } from '@mui/material'; // Import Material-UI components

const ManagementLogin = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, setuser } = props;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/managementLogin', {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                if (username === "Admin") {
                    setuser("Admin");
                } else {
                    setuser("management");
                }

                navigate(`/m-Dashboard`);
            } else {
                alert("User doesn't exist or incorrect credentials");
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div>
            {user === "None" ? (
                <div className="loginBox" style={{
                    backgroundImage: `url(${doctorImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: '92vh',
                    fontFamily: 'Arial Narrow, sans-serif'                }}>
                    <Container maxWidth="sm"> {/* Use Container from Material-UI */}
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
                            <Typography variant="h4" gutterBottom>
                                MANAGEMENT LOGIN
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ marginBottom: '20px' }} // Apply custom styles
                                />
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ marginBottom: '20px' }} // Apply custom styles
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '10px', padding: '10px'}}
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </form>
                        </Box>
                    </Container>
                </div>
            ) : (
                user === "management" ? (
                    <Typography variant="body1">You have already logged in</Typography>
                ) : (
                    <Typography variant="body1">You are not a management</Typography>
                )
            )}
        </div>
    );
};

export default ManagementLogin;
