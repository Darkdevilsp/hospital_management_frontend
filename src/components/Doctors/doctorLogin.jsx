import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, TextField, Button, Typography } from '@mui/material'; // Import Material-UI components
import doctorImage from "../../utils/loginpage.png"; // Import your background image

const DoctorLogin = (props) => {
    const { user, setuser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
    }, [user, setuser]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/doctorLogin', {
                email: email,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("doctor");
                navigate(`/d-Dashboard`);
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
            {user === "None" ?
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
                    <Container maxWidth="sm">
                        <Box sx={{
                            width: '80%',
                            background: 'white',
                            padding: '20px',
                            marginTop: '20px',
                            position: 'relative',
                            left: '400px',
                            textAlign: 'center',
                            color: 'black'
                        }}>
                            <Typography variant="h4" gutterBottom>
                               DOCTOR LOGIN
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </form>
                        </Box>
                    </Container>
                </div>
                :
                user === "doctor" ?
                    <Typography variant="body1">You have already logged in</Typography>
                    :
                    <Typography variant="body1">You are not a doctor</Typography>
            }
        </div>
    );
};

export default DoctorLogin;
