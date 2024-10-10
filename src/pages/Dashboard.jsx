import React from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext, useUserContext } from '../components/UserContext';

const Dashboard = () => {

  // const [user, setUser] = useState()
  const {user} = useUserContext(UserContext)
  
  return (
    <Grid container spacing={3} sx={{ marginTop:0.3, padding: 5, backgroundColor: '#8ad1aa', minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ paddingTop:1, marginBottom: 3, color: '#000000', fontWeight: 'bold' }}>
          Welcome to your Dashboard {user?.username}!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 2,
            marginBottom: 3,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          
          <Typography variant="body1" sx={{ color: '#00796b' }}>
            Welcome to your admin panel. Explore and manage your profile or add new employees and edit!
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper
          sx={{
            padding: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0px 12px 16px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <PersonIcon sx={{ fontSize: 48, color: '#00796b' }} />
          <Typography variant="body1" sx={{ marginY: 2, color: '#00796b' }}>
            Manage employee.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/employee-list"
            sx={{
              background: 'linear-gradient(45deg, #00796b 30%, #48a999 90%)',
              color: '#fff',
              marginTop: 2,
              '&:hover': {
                background: 'linear-gradient(45deg, #48a999 30%, #00796b 90%)',
              },
            }}
          >
            Employee List
          </Button>
        </Paper>
      </Grid>
      

    </Grid>
  );
};

export default Dashboard;
