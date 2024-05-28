import { Box, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import useStyles from './styles';
import PlaceCard from './PlaceCard';
import { GOOGLE_MAPS_API_KEY } from '../../../env';

const googleMapsLibraries = ['places'];

const Places = ({ userPlaces, setUserPlaces, date, isDateSpecific = false }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [placeDetails, setPlaceDetails] = useState({});

    const classes = useStyles();

    const { isLoaded: googleApiLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: googleMapsLibraries,
    });

    const fetchPlaceDetails = async (placeId) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(
            {
                placeId,
                fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photos', 'rating', 'types'],
            },
            (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  const cuisine = place.types
                    .map((type, index) => ({
                        key: (4617 + index).toString(),   
                        name: type.replace(/_/g, ' ').replace('restaurant', '').trim()
                    }));
                
                  setPlaceDetails({
                        title: place.name,
                        location: place.formatted_address,
                        imageUrl: place.photos ? place.photos[0].getUrl() : undefined,
                        rating:  place.rating,
                        cuisine: cuisine || 'N/A',

                      });
                } else {
                    console.error('Failed to fetch place details:', status);
                }
            }
        );
    };

    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place && place.place_id) {
                fetchPlaceDetails(place.place_id);
            } else {
                console.error('No details available for input: ' + place.name);
            }
        }
    };



    const handleSubmit = (event) => {
      event.preventDefault();
      if (!Array.isArray(userPlaces) ) {
          console.error('Expected userPlaces to be an array, but received:', userPlaces);
          return; 
      }
      const newPlace = {
        title: placeDetails.title ? placeDetails.title : "",
        location: placeDetails.location  ? placeDetails.location : "",
        imageUrl: placeDetails.imageUrl ? placeDetails.imageUrl : "" ,
        rating: placeDetails.rating ? placeDetails.rating : "",
        cuisine: placeDetails.cuisine ? placeDetails.cuisine  : "",
        website: placeDetails.website ? placeDetails.website : "",
        date: isDateSpecific ? date : "" 
    };
    if(isDateSpecific) {
       const newPlaces = [...userPlaces, newPlace];
       setUserPlaces(newPlaces)

    }else{
        setUserPlaces((prevPlaces) => [...prevPlaces, newPlace]);

    }

    };
   
    const handleDelete = (indexToDelete) => {
        setUserPlaces(userPlaces.filter((_, index) => index !== indexToDelete));
    };

    if (loadError) return <div>Error loading Google Maps</div>;
    if (!googleApiLoaded) return <div>Loading Maps...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '550px', mb: '2em' }}>
                <Autocomplete
                    onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
                    onPlaceChanged={handlePlaceChanged}

              >
                    <TextField
                        id="autocomplete"
                        label="Add a new place"
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                    />
                </Autocomplete>
                <Button onClick={handleSubmit} className={classes.placeButton} style={{ marginTop: '5px',  }}>
                    Search
                </Button>
            </Box>

            <PlaceCard places={userPlaces} handleDelete={handleDelete} />
        </div>
    );
};

export default Places;


