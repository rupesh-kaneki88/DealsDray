import React, {  useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from './dealsdray_logo.png'; 
import { UserContext, useUserContext } from './UserContext';

const Header = () => {
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const {user, setUser} = useUserContext(UserContext)


  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    handleClose();
    navigate('/login');
  };




  return (
    <Box sx={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <AppBar position="static" style={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Grant Genius Logo" style={{ height: '40px' }} />
          </Link>
          <div style={{ flexGrow: 1 }}></div> {/* This empty div pushes the buttons to the right */}
          <Button color="inherit" component={Link} to="/" style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}>Home</Button>
         
          {user ? (
            <div>
              <Button color="inherit" component={Link} to="/employee-list" style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}>Employee List</Button>

              <Button 
                color="inherit"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}
              >
                {`${user.username}`}
              </Button>

            <Button color="inherit" onClick={handleLogout}  style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}>Log out</Button>
                
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/login" style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}>Log In</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
