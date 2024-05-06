import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import doctorImage from '../../utils/loginpage.png';

const PatientLogin = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/patientLogin', {
        username: username,
        password: password,
      });

      console.log(response.data);

      if (response.data === 'you are ready to login') {
        setUser('patient');
        navigate(`/p/${username}/Dashboard`);
      } else {
        alert("User doesn't exist or incorrect credentials");
      }
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Failed to login. Please try again.');
    }
  };

  return (
    <Container
      className="loginContainer"
      style={{
        backgroundImage: `url(${doctorImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '92vh',
        maxWidth: '1600px'
      }}
    >
      <Box
        sx={{
          width: '30%',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          position: 'absolute',
          right: '10%'
        }}
        component="form"
        onSubmit={handleLogin}
      >
        <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
          Patient Login
        </Typography>
        <TextField
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="dense"
          fullWidth
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ marginTop: '20px' }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
          New user? <Link to="/patientSignup">Signup Here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default PatientLogin;
