import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { TextField, InputAdornment, Button, Typography, Paper, Grid, useMediaQuery } from '@mui/material';
import {auth} from '../../src/config/firebase-config'
import {sendPasswordResetEmail} from 'firebase/auth'

import useStyles from './styles';


const ForgotPassword = () => {
 const classes= useStyles()
 const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
 
 const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const email= data.get('email')
      sendPasswordResetEmail(auth, email)
 }
  return (
 <Container>
<Grid item xs={12}>

<Box sx={{ display: 'flex', margin:"auto", justifyContent: 'center', marginTop: '8rem', width: '100%', minHeight: '80vh' }}>
  <Paper elevation={3} sx={{ p: 48,height:"30%", width: isSmallScreen ? '80%' : '45%', textAlign: 'center' }}>
    <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '0.5rem' }} />
    <Link to='/Signup' style={{ color: '#6c757d', textDecoration: 'none' }}>Back to sign in</Link>
    <Typography variant="h5" component="h2" mt={3} mb={4}>
      Forgot your password?
    </Typography>
    <Typography variant="body1" mb={4}>
      Don't worry! Just type in your email and we will send you a code to reset your password!
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Your Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <Button variant="contained"  type="submit" className={classes.buttons} fullWidth sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Recover password
      </Button>
    </Box>
  </Paper>
</Box>
</Grid>
</Container> 

    )
}

export default ForgotPassword;