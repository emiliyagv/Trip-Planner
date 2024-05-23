import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

function Footer() {
  return (
    <Box 
      component="footer" 
      marginTop="10em"
      sx={{ 
        backgroundColor: '#f3f3f3', 
        color: 'black', 
        borderTop: 1, 
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid marginTop="5em" marginBottom="3em" container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Your Travel Companion
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Use Trip Planner to have your best travel experience.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} paddingRight={25}>
            <Typography variant="h6" color="inherit" gutterBottom>
              The best travel planner
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Use Trip Planner to map your journey to figure out the best touristic destinations, keep track of hotel and flight bookings and reservations, and read guides from other blogs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              The best group itinerary planner
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Use Trip Planner to create dailiy iteneraries add items in your list and get back to them later to view and modify them.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} /> {/* Adds a horizontal line */}
        <Grid marginTop="2em" container spacing={4} justifyContent='space-between' alignItems='center'>
          <Grid item xs={12} sm={4} lg={9}> 
          <Typography variant="h6">Trip Planner</Typography>
          </Grid>
          <Grid item xs={12} sm={4} lg={3} alignItems='center'> 

            <Typography variant="h7">Contact us: </Typography><br />
            <Typography variant="h7" marginLeft={10}>
              Email: tripplanner@gmail.com<br/>
              </Typography>

              <Typography variant="h7" marginLeft={10}>

              Phone: +36 20 547 98 32
            </Typography>
          </Grid>
      
  
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          <Typography variant="caption" color="inherit">
            Made with ❤ in BP & more © 2024 TripPlanner.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
