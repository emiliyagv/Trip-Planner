import React, {useEffect, useState} from 'react';
import { Container, Typography, TextField, Grid } from '@mui/material';
import Buttons from '../../src/components/Buttons/Buttons';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { UserAuth } from '../../src/context/AuthContextProvider'

const Trips = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formRef = useRef(null);  
  const {user} = UserAuth();
  const [errors, setErrors] = useState({ hasError: false, message: "" });

  function generateSecureRandomId() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(36);
  }
  const validateForm = () => {
    const destination = formRef.current.elements['destination'].value;
    const startDate = formRef.current.elements['startDate'].value;
    const endDate = formRef.current.elements['endDate'].value;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (!destination || !startDate || !endDate) {
      setErrors({
        hasError: true,
        message: "Please provide all the details."
      });
      return false;
    }else  if (end < start) {
      setErrors({
        hasError: true,
        message: "End date cannot be earlier than start date."
      })
      return false;
    }

    setErrors({ hasError: false, message: "" });
    return true;
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  useEffect(() =>{
    if(!user) {
      navigate('/Signup')
      return
    }
  }, [user])

  const handleFormSubmit = (event) => {

    event.preventDefault(); 
    if (!validateForm()) return;
    if(!user) {
      navigate('/Signup')
      return
    }
    const formData = new FormData(formRef.current);  
    const tripId = generateSecureRandomId()
    const data = {
      tripId: tripId,
      destination: formData.get('destination'),
      startDate: formatDate(formData.get('startDate')),
      endDate: formatDate(formData.get('endDate')),

    };
    navigate('/tripdetails', { state: { data } });  
  };

  return (
    <Container maxWidth="sm" className={classes.formContainer}>
      <form ref={formRef} onSubmit={handleFormSubmit}>
      <Typography variant="h4" className={classes.title}>
        Plan a new trip
      </Typography>
      {errors.hasError && (
          <Typography variant="body2" style={{ color: 'red', textAlign: 'center' }}>
            {errors.message}
          </Typography>
        )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.inputField}
            fullWidth
            required
            name="destination"
            label="Where to?"
            placeholder="e.g., Paris, Hawaii, Japan"
            variant="outlined"
            helperText="Choose a destination to start planning"
          />
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
             type="date"
             fullWidth
             required
             name="startDate"
             variant="outlined"
             label="Start date"
             InputLabelProps={{ shrink: true }}
             className={classes.dateInput}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             type="date"
             required
             fullWidth
             name="endDate"
             variant="outlined"
             label="End date"
             InputLabelProps={{ shrink: true }}
             className={classes.dateInput}
            />
          </Grid>
        </Grid>
      </Grid>
 
      {/* <Box display="flex" alignItems="center" width="100%" className={classes.inputField}>
        <Button color="primary" startIcon={<span>+</span>}>
          Invite trip mates
        </Button>
        <FormControl variant="outlined" className={classes.dateInput}>
          <InputLabel>Friends</InputLabel>
          <Select label="Friends">
            <MenuItem value="friend1">Friend 1</MenuItem>
            <MenuItem value="friend2">Friend 2</MenuItem> */}
            {/* Add more MenuItem components for more friends */}
          {/* </Select>
        </FormControl>
      </Box> */}
      <div style={{marginTop: "15px", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Buttons title="Start Planning" onclick={handleFormSubmit} keyname="tripdetails"/>
      </div>
    </form>
    </Container>
  );
};

export default Trips;
