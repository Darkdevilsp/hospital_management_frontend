import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, TextField, Button, Typography } from '@mui/material'; // Import Material-UI components
import doctorImage from "../../utils/loginpage.png";


function PatientLogin(props) {
    const { user, setuser, setUsingname } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/patientLogin', {
                email: email,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("patient");
                setUsingname(email);
                console.log(user);
                navigate(`/p-Dashboard`);

            } else {
                alert("User doesn't exist or incorrect credentials");
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div className="loginBox" style={{
            backgroundImage: `url(${doctorImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '92vh',
            fontFamily: 'Arial Narrow, sans-serif'
        }}>
            {user === "patient" ? (
                <div>
                    <Typography variant="h4">You have already logged in</Typography>
                </div>
            ) : user === "None" ? (
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
                        <Typography variant="h4" gutterBottom style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}>
                            PATIENT LOGIN
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px'}}
                                fullWidth
                            >
                                Login
                            </Button>
                        </form>
                        <Typography variant="body1" sx={{ marginTop: '20px' }}>
                            New user? <Link to="/patientSignup">Signup Here</Link>
                        </Typography>
                    </Box>
                </Container>
            ) : (
                <div>
                    <Typography variant="h4">You don't have access to this page</Typography>
                </div>
            )}
        </div>
    );
}

export default PatientLogin;
