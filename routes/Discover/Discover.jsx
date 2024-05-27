import React, { useState, useEffect, useRef } from 'react';
import { Grid, Container, Typography, TextField } from '@mui/material';
import { useJsApiLoader, Autocomplete as GoogleMapsAutocomplete } from '@react-google-maps/api';
import List from '../../src/components/List/List';
import Map from '../../src/components/Map/Map';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../../src/config/firebase-config';
import useStyles from './styles';
import Buttons from '../../src/components/Buttons/Buttons';
import { GOOGLE_MAPS_API_KEY } from '../../env';

function Discover() {
    const classes = useStyles();
    const [places, setPlaces] = useState({ restaurants: [], hotels: [], attractions: [] });
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({ sw: { lat: 0, lng: 0 }, ne: { lat: 0, lng: 0 } });
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('0');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [search, setSearch] = useState('');
    const [zoom, setZoom] = useState(12);  

    const autocompleteRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });



    // useEffect(() => {
    //     const fetchCoordinates = async () => {
      
    //       console.log(urldest)
    //       const url = `https://api.maptiler.com/geocoding/${search.split()[0]}.json?key=nmO3tm51a8nrPeztTcc7`;
    //       console.log(url)
    //       try {
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         const firstResult = data.features[0];
    //         if (firstResult) {
    //           const { coordinates } = firstResult.geometry;
    //           const newCoordinates = { lng: coordinates[0], lat: coordinates[1] };
          
    //           if (
    //             newCoordinates.lng !== coordinates.lng ||
    //             newCoordinates.lat !== coordinates.lat
    //           ) {
    //             setCoordinates(newCoordinates);
    //           const featureType = firstResult.place_type[0];
    //           switch (featureType) {
    //             case 'country':
    //               setZoom(4);
    //               break;
    //             case 'region':
    //               setZoom(12);
    //               break;
    //             case 'city':
    //               setZoom(12);
    //               break;
    //             default:
    //               setZoom(12);
    //           }
        
    //           return { sw: { lng: coordinates[0], lat: coordinates[1] }, ne: { lng: coordinates[0], lat: coordinates[1] } }; 
    //         }
    //       }
    //       } catch (error) {
    //         console.error("Failed to fetch coordinates", error);
    //       }
    //     };
        
        // const loadData = async () => {
        //   const bounds = await fetchCoordinates();  
        //   if (bounds) {
        //     getPlaces("restaurants", bounds.sw, bounds.ne)
        //       .then((data) => {
        //         setPlaces(data);  
        //       })
        //       .catch((error) => {
        //         console.error("Failed to fetch places:", error);
        //       });
        //   }
        // };
        
        // loadData();
     
    //   }, [search]);
    


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitude = position.coords.latitude;
            let long = position.coords.longitude;
            setCoordinates({ lat: latitude, lng: long });
        });
    }, []);

    async function getPlaces(type, sw, ne) {
        const docRef = doc(db, type, `${parseInt(sw.lat)},${parseInt(sw.lng)},${parseInt(ne.lng)},${parseInt(ne.lat)}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return JSON.parse(docSnap.data().json).data;
        } else {
            console.log('No such document!');
        }
    }

    const types = ['restaurants', 'hotels', 'attractions'];

    useEffect(() => {
        setIsLoading(true);
        const fetchPromises = types.map((type) => getPlaces(type, bounds.sw, bounds.ne));

        Promise.all(fetchPromises)
            .then((results) => {
                const newData = results.reduce((acc, data, index) => {
                    acc[types[index]] = data;
                    return acc;
                }, {});

                setPlaces(newData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setIsLoading(false);
            });
    }, [bounds, coordinates]);

    const handleSearch = async () => {
        const url = `https://api.maptiler.com/geocoding/${search.split(",", 1)[0]}.json?key=nmO3tm51a8nrPeztTcc7`;
       
       console.log(search.split(",", 1)[0])
        const response = await fetch(url);
        const data = await response.json();
        const firstResult = data.features[0];
        if (firstResult) {
            const { coordinates } = firstResult.geometry;
            setCoordinates({ lng: coordinates[0], lat: coordinates[1] });

            // const featureType = firstResult.place_type[0];

            // setZoom(featureType === 'country' ? 4 : featureType === 'city' ? 12 : 8);
            // console.log(featureType)
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const { location } = place.geometry;
            setCoordinates({ lat: location.lat(), lng: location.lng() });
            setSearch(place.formatted_address || place.name);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Grid container spacing={20} marginTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h3" className={classes.typographyStyle} marginTop="1em" marginBottom="1em" sx={{ ml: { xs: 35, sm: 45 } }}>
                    Discover the places around you
                </Typography>
                <Grid container spacing={3} display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={8} marginLeft={35}>
                        <GoogleMapsAutocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
                            <TextField value={search} onChange={handleSearchChange} label="Search for places" variant="outlined" fullWidth />
                        </GoogleMapsAutocomplete>
                    </Grid>
                    <Grid item lg={1}>
                        <Buttons title="Search" onclick={handleSearch} size="large" />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8} lg={10} xl={10} style={{ height: '85vh' }}>
                    <div className={classes.mapwrap}>
                        <Map setBounds={setBounds} coordinates={coordinates} places={places.restaurants} zoom={zoom} />
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <List places={filteredPlaces.length > 0 ? filteredPlaces : places} rating={rating} setRating={setRating} isLoading={isLoading} />
                </Grid>
            </Grid>
            <Container />
        </>
    );
}

export default Discover;
