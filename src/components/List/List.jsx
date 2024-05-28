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