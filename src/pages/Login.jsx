// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { keyframes } from '@emotion/react';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext, useUserContext } from '../components/UserContext';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setUser} = useUserContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", { username, password });
      if (res.data.message === "Login successful") {
         // Store user data in session storage
        // sessionStorage.setItem("user", JSON.stringify(res.data.user));

        console.log("User data: ",res.data)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        setUser(res.data.user); // Update the user context
        toast.success("Login successfully");
        setTimeout(() =>{
          navigate("/dashboard");
        },1000)
      } else {
        setError(res.data.message);
      }
    } catch (error) {
       // Use the message from the server or a fallback error message
       if (error.response && error.response.data.message) {
            setError(error.response.data.message); // Display server error message
        } else {
            setError("Failed to login"); // Fallback error message
        }
        console.error(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: `${fadeIn} 1s ease-in-out`,
        paddingTop: '20px', // Adjust this value as needed
        paddingBottom: '50px', // Adjust this value as needed
      }}
    >
      <ToastContainer />
      <Container maxWidth="sm" sx={{ animation: `${fadeIn} 1s ease-in-out` }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField 
              label="username" 
              type="text" 
              fullWidth 
              margin="normal" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
               
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
               
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? Contact Admin
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
