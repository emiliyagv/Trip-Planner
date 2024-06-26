import React from 'react';
import { CircularProgress, Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';
import Buttons from '../Buttons/Buttons'
import useStyles from './styles'

const PlaceDetails = ({place}) => {
    const classes = useStyles()
    const displayName = place.name.split('(')[0].trim();
    return (
       
         <>
         <div className={classes.divStyle } style={{ marginLeft:"1em"}} >
         <Card elevation={6} >
            <CardMedia 
            className={classes.cardStyle }
                image={ place.photo.images.large.url}
                title={place.name} />
        </Card>
        <CardContent className={classes.compactCardContent}>
            <Typography variant='h6'className={classes.headerText}>{displayName}</Typography>

            <Box display="flex" justifyContent="space-between">
                <Rating size="small" value={Number(place.rating)} readOnly />

                <Typography gutterBottom variant="subtitle2" className="compactText">{place.price_level}</Typography>
            </Box>

         
            {place?.address && (
                <Typography gutterBottom variant='caption' color='textSecondary' className={classes.subtitle}>
                    <LocationOnIcon/> {place.address}
                </Typography>
            )}  
                        <Box display="flex" justifyContent="space-between">

            {place?.phone && (
                <Typography gutterBottom variant='caption' color='textSecondary' className={classes.subtitle}>
                    <PhoneIcon/> {place.phone}
                </Typography>
            )}  
             <CardActions className={classes.buttonContainer}>
  
        <Buttons title="Website" size="small" onclick={() => window.open(place.website, '_blank')} />
        </CardActions>
        </Box>

        </CardContent>
        </div>
        </>
    )
}

export default PlaceDetails;