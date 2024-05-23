import React, {useState} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import useStyles from './styles';
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import SliderList from './SliderList/SliderList';

const List = ({places, type, setType, rating, setRating, isLoading}) => {

    const classes= useStyles();

    return (
        <div className={classes.container} >
            <Typography variant="h4" marginTop="1em" marginBottom="1em"> Restaurants, Hotels & Attractions around you</Typography> 
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
        {/* <div className={classes.formdiv}>
            <FormControl >
                <InputLabel className={classes.formcontrol}>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <InputLabel className={classes.formcontrol}>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)} label="Rating">
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            </div> */}
        <Grid container spacing={8}>
        {Object.entries(places).map(([key, val]) =>(
            <><Typography variant="h5" marginLeft="1em" marginTop="1em">{(key == "restaurants") ? "Restaurants": ((key=="hotels" )? "Hotels" : "Attractions")}</Typography>
                <Grid item xs={12} md={12} lg={12} key={key} className={classes.list}>
                    {val &&
                        <SliderList key={key} places={val} />}
                </Grid></>
         )
            
        )}
        </Grid>
        </>
            )}
        </div>
      

        )
}
  

export default List;