import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {  Typography, Container, Grid, Paper, Button , Box} from '@mui/material';
import Map from '../../../src/components/Map/Map';
import useStyles from './styles';
import Explore from '../../../src/components/TripDetailsComponents/Explore';
import Details from '../../../src/components/TripDetailsComponents/Details';
import Places from '../../../src/components/TripDetailsComponents/Places';
import Itinerary from '../../../src/components/TripDetailsComponents/Itinerary';
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore"; 
import {db} from '../../../src/config/firebase-config';
import Budgeting from '../../../src/components/TripDetailsComponents/Budgeting';
import Buttons from '../../../src/components/Buttons/Buttons.jsx'
import { UserAuth } from '../../../src/context/AuthContextProvider'
import { useNavigate } from 'react-router-dom';

const TripDetails = () => {
  const location = useLocation();
  const { data } = location.state;

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(10);  
  const [bounds, setBounds] = useState({});
  const [places, setPlaces] = useState([]);
  const [userPlaces, setUserPlaces] = useState(data?.userPlaces || []);
  const [exploreItems, setExploreItems] = useState([])
  const [details, setDetails] = useState(data?.details || {flight: {}, rental: {}, transport: {}})
  const [budgetData, setBudgetData] = useState(data?.budgetData || {});
  const [expenses, setExpenses] = useState(data?.expenses ||[]);

  const {user} = UserAuth();
  const [itineraryPlaces, setItineraryPlaces] = useState(data?.itineraryPlaces || [])

  const navigate = useNavigate()

  const tripData = {
    tripId: data?.tripId || data?.tripData?.tripId,
    title: data?.destination ? `Trip to ${data.destination}` : data?.tripData?.title,
    startDate: data?.startDate || data?.tripData?.startDate,
    endDate: data?.endDate || data?.tripData?.endDate,
    zoom: 10
  };


  async function getPlaces(type, sw, ne) {

    const docRef = doc(db, type,`${parseInt(sw.lat)},${parseInt(sw.lng)},${parseInt(ne.lng)},${parseInt(ne.lat)}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return JSON.parse(docSnap.data().json).data;
    } else {
      alert("This location does not exist in our database for now. Thank you for you understanding!");
      navigate('/Trips')
    }
  }

  
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!data  ) {
        console.error("No destination provided");
        return; 
    }
      const urldest = data?.destination ?? data?.tripData?.title.split(" ")[2]
      const url = `https://api.maptiler.com/geocoding/${urldest}.json?key=nmO3tm51a8nrPeztTcc7`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const firstResult = data.features[0];
        if (firstResult) {
          const { coordinates } = firstResult.geometry;
          const newCoordinates = { lng: coordinates[0], lat: coordinates[1] };
      
          if (
            newCoordinates.lng !== coordinates.lng ||
            newCoordinates.lat !== coordinates.lat
          ) {
            setCoordinates(newCoordinates);
          const featureType = firstResult.place_type[0];
          switch (featureType) {
            case 'country':
              setZoom(4);
              break;
            case 'region':
              setZoom(12);
              break;
            case 'city':
              setZoom(12);
              break;
            default:
              setZoom(12);
          }
    
          return { sw: { lng: coordinates[0], lat: coordinates[1] }, ne: { lng: coordinates[0], lat: coordinates[1] } }; 
        }
      }
      } catch (error) {
        console.error("Failed to fetch coordinates", error);
      }
    };
    
    const loadData = async () => {
      const bounds = await fetchCoordinates();  
      if (bounds) {
        getPlaces("restaurants", bounds.sw, bounds.ne)
          .then((data) => {
            setPlaces(data);  
          })
          .catch((error) => {
            console.error("Failed to fetch places:", error);
          });
      }
    };
    
    loadData();
 
  }, [data?.destination, data?.tripData?.title]);

 
  
  useEffect(() => {
    setExploreItems(places
    .filter(place => place.photo).map(place => ({
      title: place.name || " ",
      imageUrl: place.photo?.images.large.url || " ",
      location: place.address || " ",
      rating: place.rating || " ",
      cuisine: place.cuisine || " ",
      website: place.website || " ",
    })));
  }, [places]); 




  const addPlace = (place) => {
  if(!userPlaces.includes(place)){
    setUserPlaces((currentPlaces) => [...currentPlaces, place]);

  }
  };

  function isNonSerializableObject(obj) {
    const nonSerializableTypes = [
        'Window',
        'Document',
        'HTMLElement',
        'CSSStyleSheet',
        'SVGElement',
        'SVGLength',
    ];

    const objType = Object.prototype.toString.call(obj).slice(8, -1);
    return nonSerializableTypes.includes(objType);
}

function cleanObject(obj) {
    const cleanedObj = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                cleanedObj[key] = value.filter(item => !isNonSerializableObject(item));
            } else if (!isNonSerializableObject(value)) {
                cleanedObj[key] = cleanObject(value);
            }
        } else if (value !== undefined) {
            cleanedObj[key] = value;
        }
    }

    return cleanedObj;
}

const handleSave = async () => {
  const tripId = tripData.tripId;
  const tripDetails = {tripId, tripData, budgetData, expenses, userPlaces, details, itineraryPlaces,
  };
  const cleanTripDetails = cleanObject(tripDetails);
  try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const userTrips = userData?.trips || [];
      const tripIndex = userTrips.findIndex((trip) => trip.tripId === tripId);
      if (tripIndex >= 0) {
          const updatedTrips = [...userTrips];
          updatedTrips[tripIndex] = cleanTripDetails;
          await updateDoc(userRef, { trips: updatedTrips });
      } else {
          await updateDoc(userRef, { trips: arrayUnion(cleanTripDetails) });
      }

      navigate("/Profile");
  } catch (error) {
      console.error("Error saving trip data:", error);
  }
};

  

  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.rootContainer}>

 <Grid container className={classes.gridContainer}>
        <Grid item xs={12} md={6} lg={6} className={classes.detailsPanel}>

      <Paper elevation={3} className={classes.backgroundPaper} >
          <div className={classes.backgroundContainer} style={{backgroundImage:"url('/images/4829589.jpg')"}}>

          <Paper elevation={6} className={classes.innerPaper}>

            <Typography variant="h3" className={classes.title}>
             {tripData.title}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              {tripData.startDate} - {tripData.endDate}
            </Typography>
          </Paper>
          </div>
          <Grid item xs={12} md={12} lg={12}  className={classes.explore}>
          <Typography variant="h4" marginTop={25} marginBottom={25} marginLeft={25}>
              Explore new places
            </Typography>
            <Explore exploreItems={exploreItems} onAddPlace={addPlace}/>
            </Grid>
            <Grid item xs={12} sm={12}md={12} lg={12}  className={classes.explore}>
            <Typography variant="h4"  marginTop={25} marginBottom={25} textAlign="center">
              Reservations
            </Typography>
            <Details details={details} setDetails={setDetails}/>
            </Grid>
            <Budgeting budgetData={budgetData} setBudgetData={setBudgetData} expenses={expenses} setExpenses={setExpenses} />
            <Grid item xs={12} md={12} lg={12}  className={classes.explore}>
            <Typography variant="h4"  marginTop={25} marginBottom={25} marginLeft={25}>
              Places to visit
            </Typography>
            <Places  userPlaces={userPlaces} setUserPlaces={setUserPlaces}/>
            </Grid>
            <Grid item xs={12} md={12} lg={11}  className={classes.explore}>
            <Typography variant="h4"  marginTop={25} marginBottom={25}>
              Your daily itinerary
            </Typography>
        <Itinerary startDate={tripData.startDate} endDate={tripData.endDate} itineraryPlaces={itineraryPlaces} setItineraryPlaces={setItineraryPlaces}/>
        </Grid>
        <div style={{margin: "15px", display:"flex", justifyContent:"center", alignItems:"center"}}>

        <Buttons title="Save" onclick={handleSave} keyname="save" type='submit'/>
        </div>

        </Paper>

      </Grid>


      <Grid item xs={12} md={6} lg={12} >
        <div className={classes.mapPanel}>
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={places}
          zoom={zoom}
        />
        </div>
      </Grid>

    </Grid>

  </Container>
  );
};

export default TripDetails;
