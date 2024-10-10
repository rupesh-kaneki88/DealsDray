import React from 'react';
import { Container, Typography,  Box, Paper, Grid, Card, CardContent } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const cardHover = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
`;

const Home = () => {
  return (
    <Box
    sx={{
      backgroundImage: 'url(/bg1.jpg)',  // Reference to bg1 in the public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '20px', // Adjust this value as needed
      paddingBottom: '50px', // Adjust this value as needed
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: `${fadeIn} 1s ease-in-out`
    }}
    >
      <Container sx={{ mt: 4, animation: `${fadeIn} 1s ease-in-out` }}>
        <Paper sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to <span style={{ color: '#000000' }}>DealsDray</span>
          </Typography>
          <Typography variant="h3" component="p" gutterBottom>
          Taking Your
Retail Business
to the Next Level.
          </Typography>
         
        </Paper>
        <Box component="section" sx={{ animation: `${fadeIn} 1s ease-in-out 0.5s`, animationFillMode: 'forwards' }}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: '#ffffff' }}>
            Certified Refurbished Mobiles
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
            
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      animation: `${cardHover} 0.3s ease-in-out forwards`,
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" style={{ color: '#000000' }}>
                        Certified Refurbished Mobiles
                    </Typography>
                  </CardContent>
                </Card>
           
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      animation: `${cardHover} 0.3s ease-in-out forwards`,
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" style={{ color: '#000000' }}>
                        New Mobiles
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      animation: `${cardHover} 0.3s ease-in-out forwards`,
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" style={{ color: '#000000' }}>
                        Mobile Accessories
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      animation: `${cardHover} 0.3s ease-in-out forwards`,
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" style={{ color: '#000000' }}>
                        Automotive Accessories
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
