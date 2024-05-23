import React,{ useState} from 'react';
import { IconButton, TextField, Paper, Menu, MenuItem, Box, Typography, Grid } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import CarRentalIcon from '@mui/icons-material/DriveEta';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/system';
import Buttons from '../Buttons/Buttons';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const convertToUserFormat = (dateString) => {
    return dayjs(dateString).format('ddd, MMM D • h:mm A');
};
const getCurrentFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start', 
  borderRadius: 8,
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
}));

const DetailButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const DetailSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 8,
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  backgroundColor: theme.palette.background.paper,
}));


const Details = ({details, setDetails}) => {
  const [selectedDetail, setSelectedDetail] = useState('');
  const [anchorEl, setAnchorEl] = useState(false);
  const [openField, setopenField] = useState(null);

  const open = Boolean(anchorEl);
  const [formValues, setFormValues] = useState( {});
  const [errorMessage, setErrorMessage] = useState('');

  const handleDetailChange = (detail) => {
      setSelectedDetail(detail);
      setAnchorEl(null); 
      setopenField(!openField)
    
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setFormValues({
        ...formValues,
        [name]: value,
    });
};
  const handleSubmit = (event) => {
    event.preventDefault();
    let first = "";
    let second = "";
    if(selectedDetail === 'rental' ){
      first = formValues.checkinDate;
      second =  formValues['checkoutDate'];
    }else {
      first = formValues['depttime'];
      second = formValues['arrivaltime']
    }

   const firstTime = new Date(first);
    const secondTime = new Date(second);
    if (firstTime  >= secondTime) {
      if(selectedDetail === 'rental' ){

      setErrorMessage('Check-in date should be smaller than checkout date.');
      }else {
        setErrorMessage('Departure time should be smaller than arrival time.');

      }
      return;
    } else {
        setErrorMessage('');
    }

    const newDetails = {
      ...details,
      [selectedDetail]: {
        ...details[selectedDetail],
        ...formValues,
      },
    };
    setDetails(newDetails);
  }
  const detailsConfig = {
    flight: {
      fields: [
        { label: "Airline", name: "airline", key: "airline" },
        { label: "Flight Number", name: "flightnumber", key: "flightnumber" },
        {label: "Origin", name: "origincountry", key: "origincountry" },
        {label: "Destination", name: "destination", key: "destination" },
        {label: "Departure", name: "depttime", key: "depttime" },
        {label: "Arrival", name: "arrivaltime", key: "arrivaltime" },

      ]
    },
    rental: {
      fields: [
        { label: "Hotel Name", name: "hotel", key: "hotel" },
        { label: "Confirmation Number", name: "confirmation", key: "rentalnumber" },
        {label: "Address", name: "address", key: "address" },
        {label: "Check-in Date", name: "checkinDate", key: "checkintime" },
        {label: "Check-out Date", name: "checkoutDate", key: "checkouttime" },

      ]
    },
    transport: {
      fields: [
        { label: "Car Rental Company", name: "carRental", key: "carRental" },
        { label: "Reservation Number", name: "reservation", key: "transportnumber" },
        {label: "Address", name: "address", key: "address" },
         {label: "Departure", name: "depttime", key: "depttime" },
        {label: "Arrival", name: "arrivaltime", key: "arrivaltime" },
      ]
    },
    train: {
      fields: [
        { label: "Train Name", name: "trainName", key: "train" },
        { label: "Reservation Number", name: "reservation", key: "trainnumber" },
        {label: "Address", name: "address", key: "address" },
         {label: "Departure", name: "depttime", key: "depttime" },
        {label: "Arrival", name: "arrivaltime", key: "arrivaltime" },
      ]
    },
    bus: {
      fields: [
        { label: "Bus Name", name: "busName", key: "busName" },
        { label: "Reservation Number", name: "reservation", key: "busnumber" },
        {label: "Address", name: "address", key: "address" },
         {label: "Departure", name: "depttime", key: "depttime" },
        {label: "Arrival", name: "arrivaltime", key: "arrivaltime" },
      ]
    }
  };

  return (
    <Grid container spacing={12} sx={{ flexGrow: 1, width: "550px" , mt: 20}}>
        <Grid item xs={9} lg={12}>
          
        <Item elevation={3}  sx={{justifyContent:"space-evenly", width:"100%" }}>
          <DetailButton onClick={() => handleDetailChange('flight')}>
            <FlightIcon />
          </DetailButton>
          <DetailButton onClick={() => handleDetailChange('rental')}>
            <HotelIcon />
          </DetailButton>
          <DetailButton onClick={() => handleDetailChange('transport')}>
            <CarRentalIcon />
          </DetailButton>
          <DetailButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <MoreHorizIcon />
          </DetailButton>
        </Item>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleDetailChange('train')}>
          <TrainIcon />
          Train
        </MenuItem>
        <MenuItem onClick={() => handleDetailChange('bus')}>
          <DirectionsBusIcon />
          Bus
        </MenuItem>
 
      </Menu>
      </Grid>

        <Grid item xs={9} lg={12}>
          
       {details[selectedDetail] && Object.keys(details[selectedDetail]).length > 0 &&

   <Box sx={{ border: '1px solid gray', backgroundColor:'#f5f5f5', borderRadius: 2, p: 20 }}>
   
   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
   <Typography variant="subtitle1">{details[selectedDetail][(detailsConfig[selectedDetail].fields)[0].name]}</Typography>

   
   { selectedDetail.localeCompare('flights') == 0  &&
   
     <Typography variant="subtitle1">BUD &rarr; GYD</Typography>
    }
     <Typography variant="body2">{details[selectedDetail][(detailsConfig[selectedDetail].fields)[1].name]}</Typography>
   </Box>
  
   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
     <Typography variant="body2">{details[selectedDetail][(detailsConfig[selectedDetail].fields)[2].name]}</Typography>
     { selectedDetail.localeCompare('flights') == 0  &&

     <Typography variant="body2">Baku</Typography>
    }

   </Box>
  
   <Typography variant="body2" gutterBottom>
   { 
   convertToUserFormat(details[selectedDetail][(detailsConfig[selectedDetail].fields)[selectedDetail.localeCompare('flights') ==0 ? 4 : 3].name])}
-
{ convertToUserFormat(details[selectedDetail][(detailsConfig[selectedDetail].fields)[selectedDetail.localeCompare('flights') ==0 ? 5 : 4].name])}
   </Typography>
 
 </Box>
       
       }
       

      {openField && (
        <DetailSection component="form" onSubmit={handleSubmit}>
          {detailsConfig[selectedDetail].fields.map((field, index )=> (
          (  <TextField
            label={field.label}
            name={field.name}
            key={field.key}
            type={field.key.indexOf("time") !== -1  ? "datetime-local" : "text"}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            required
            defaultValue={field.key.indexOf("time") !== -1  ? getCurrentFormattedDate() : ''}
            onChange={handleInputChange}
            InputLabelProps={{
                shrink: true,
            }}
           
        />
        
           ) 
         
            )
          )
            
         }

{errorMessage && (
            <div style={{ color: 'red', margin: '10px 0' }}>
                {errorMessage}
            </div>
        )} 
          <div style={{marginTop: "15px", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Buttons title="Save" type="submit" />
          </div>
        </DetailSection>
      )}
      
      </Grid>

    </Grid>
  );
};

export default Details;
