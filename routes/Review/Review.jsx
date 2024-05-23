

import React,{ useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box,TextField, Divider, Button, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { useJsApiLoader, Autocomplete as GoogleMapsAutocomplete } from '@react-google-maps/api';
import useStyles from './styles';
import {useNavigate} from 'react-router-dom'
import Buttons from '../../src/components/Buttons/Buttons';
import ReviewForm from './ReviewForm';
import { db } from '../../src/config/firebase-config';
import { storage } from '../../src/config/firebase-config';
import { getDoc,getDocs, doc, updateDoc, collection } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { UserAuth } from '../../src/context/AuthContextProvider';
import { Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GOOGLE_MAPS_API_KEY } from '../../env';

const googleMapsLibraries = ['places'];

function Review({ initialReviews }) {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [selectedPlace, setSelectedPlace] = useState({});
    const [placeDetails, setPlaceDetails] = useState({});
    const [userReviews, setUserReviews] = useState(initialReviews || []);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const {user, logout} = UserAuth();
    const navigate = useNavigate()

    const autocompleteRef = useRef(null);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const { isLoaded: googleApiLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: googleMapsLibraries, 
    });

    useEffect(() => {
        if (googleApiLoaded && !autocompleteRef.current && window.google) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
                types: ['establishment'],
                fields: ['place_id', 'geometry', 'name']
            });

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                setSelectedPlace(place);
                setSearch(place.name);

                if (!place.geometry) {
                    console.error('No details available for input: ' + place.name);
                    return;
                }
         

            });
        }
    }, [googleApiLoaded]);



    const fetchImages = async (reviewId) => {
        const imagesRef = ref(storage, `/reviews/${user.uid}/${reviewId}`);
        const snapshot = await listAll(imagesRef);
        const urls = await Promise.all(snapshot.items.map(item => getDownloadURL(item)));
        setImages(prevImages => ({
            ...prevImages,
            [reviewId]: urls
        }));
        setLoading(false);
      };


    useEffect(() => {
        const getData = async () => {
            if (user?.uid) {

              const docRef = doc(db, "reviews", user.uid);
              const docSnap = await getDoc(docRef);
        
              if (docSnap.exists()) {
                const reviewData = docSnap.data().reviews;

                if (Array.isArray(reviewData)) {
                  setUserReviews(reviewData);
                  reviewData.forEach(review => {
                    if (review.reviewId && !(review.reviewId in images)) {
                        fetchImages(review.reviewId).catch(console.error);
                    }
                });
                } else {
                  console.error('Trips is not an array');
                }
              } else {
                console.log("No such document!");
              }
            }

          };
    
      
          getData();
    }, [user])

    useEffect(() => {
        console.log(images)
    }, [images])
    async function handleSearch() {
        if (selectedPlace) {
            await fetchPlaceDetails(selectedPlace.place_id);
           
        } else {
            console.error('No place selected');
        }
    }

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "reviews"));
            let selectedReviews = []
            if (querySnapshot) {

            querySnapshot.forEach((snap) => {
                const data = snap.data();
                if (data && data.reviews && placeDetails.name) {
                    console.log("name in place det", placeDetails.name)
                    console.log("name in review", data.reviews[0].placeDetails.name)
    
                    selectedReviews.push(data.reviews.filter(review => 
                      review.placeDetails && review.placeDetails.name === placeDetails.name
                    ))}
                });
            }

                if(selectedReviews.length > 0) setUserReviews(selectedReviews.flat())
                }
    
       getData()
    
    }, [placeDetails])

    async function fetchPlaceDetails(placeId) {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
            placeId: placeId,
            fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photos']
        }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails({
                    name: place.name,
                    address: place.formatted_address,
                    photo: place.photos ? place.photos[0].getUrl() : undefined
                });
            } else {
                console.error('Failed to fetch place details:', status);
            }
        });
    }

    const handleDeleteReview = async (indexToDelete) => {
        try {
            const reviewRef = doc(db, "reviews",  user.uid);
            const reviewDoc = await getDoc(reviewRef);
            const data = reviewDoc.data()
            const oldreviews = data.reviews || [];
            oldreviews.splice(indexToDelete, 1)
            setUserReviews(oldreviews)
            const userRef = doc(db, "reviews",  user.uid);

            await updateDoc(userRef, {
                reviews : oldreviews,
              });
        
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };


    const handleWriteReview = () => {
        if(user){
      setShowReviewForm(true);
        }
        else{
            navigate('/Signup')
        }

  };

  const handleReviewFormSubmit = (reviewData) => {
      console.log('Review Submitted:', reviewData);
      setShowReviewForm(false); 
  };

  const handleReviewFormCancel = () => {
      setShowReviewForm(false); 
  };

    if (loadError) return <div>Error loading Google Maps</div>;
    if (!googleApiLoaded) return <div>Loading Maps...</div>;

    return (
      <Grid container justifyContent="space-evenly" className={classes.container}>
            {!showReviewForm && (
                <>
                <Grid item xs={12} sm={showReviewForm ? 4 : 10} xl={9}   style={{
                              backgroundImage: `
        url('/images/4633476.jpg')`, 
                            backgroundSize: 'fit',
                            backgroundPosition: 'center', 
                            backgroundRepeat: 'no-repeat',
                            padding: '40px', 
                            color: '#fff'
                        }}>

<Box
    sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      padding: '20px',
      margin: '30px 0', 
      borderRadius: '8px' 
    }}
  >
    <Typography align="center" variant="h4" gutterBottom>
      Write a review, help others with your experience
    </Typography>
    </Box>
                    <TextField
                        id="autocomplete"
                        variant="outlined"
                        fullWidth
                        placeholder="Search for places"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        InputLabelProps={{
                            style: { color: '#aaa' } 
                        }}
                        InputProps={{
                            style: {
                                color: 'black', 
                                backgroundColor: 'white', 
                            }
                        }}
                        sx={{
                            '&.label.Mui-focused': {
                                color: 'grey',
                            },
                            '&.MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'grey', 
                                },
                                '&:hover fieldset': {
                                    borderColor: 'grey', 
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'grey',
                                }
                            }
                        }}
                    />
                    <Button  onClick={handleSearch} className={classes.reviewButton}  style={{ marginTop: '10px' }}>
                        Search
                    </Button>
                 </Grid>
                 </>

                    )}
                <Grid item xs={12} sm={showReviewForm ? 4 : 10} className={showReviewForm ? classes.cardGridReview : classes.cardGrid}>

                    {placeDetails.name && (
                    <Card className={classes.card}>
                      {placeDetails.photo && ( 
                          <CardMedia
                          component="img"
                          height="130"
                          width="80"
                          image={placeDetails.photo? placeDetails.photo: ""}
                          alt={placeDetails.name}
                          />
                      )}
                      <CardContent>
                          <Typography gutterBottom variant="h7" component="div">
                          {placeDetails.name}
                          </Typography>
                      {placeDetails.address && (
                          <><Typography variant="body2" color="textSecondary" component="p">
                              {placeDetails.address}
                          </Typography>
                         <div style={{padding: "10px"}}>
                      <Buttons  onclick={handleWriteReview} title="Write a review"/>
                        </div>
                      </>
                      )}

                      </CardContent>
                        </Card>
                    )}
                </Grid>


            {showReviewForm && (
                <Grid item xs={12} sm={6} lg={6}>
                <ReviewForm
                    placeDetails={placeDetails}
                    setPlaceDetails={setPlaceDetails}
                    onSubmit={handleReviewFormSubmit}
                    onCancel={handleReviewFormCancel}
                />
              </Grid>
            )}


{userReviews.length > 0 && 
                
<Grid item xs={12} sm={12} md={10} lg={10} xl={9} marginTop="5em" spacing={20}  justifyContent="flex-start">
<div style={{ maxWidth: 750, margin: 'auto 0 auto 0' }}>
<Typography variant="h5" style={{ fontWeight: 'bold', margin: '25px' }}>
                {selectedPlace ?  "Reviews" : "Your reviews"} 
                      </Typography>
            { userReviews.map((userReview, index) => (
              <Grid item xs={12}  key={userReview.reviewId}>
               <Card key={index} data-testid={`review-title-${userReview.reviewId}`} style={{ position: 'relative' }}> 
                        <IconButton
                            onClick={() => handleDeleteReview(index)}
                            aria-label="delete review"
                            data-testid={`delete-button-${userReview.reviewId}`}

                            style={{ position: 'absolute', top: 0, right: 0, margin: '8px' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                  <CardContent>
                      <Grid container display="flex" flexDirection="column">
                      <Typography variant="h6" style={{ fontWeight: 'bold', padding:"1em 0 1em 0"}}>
                                  {userReview.placeDetails.name}
                              </Typography>
                          <Grid item xs={12} md={4} lg={4} xl={4}>
                          
                              <CardMedia
                                  component="img"
                                  image={userReview.placeDetails.photo}
                                  alt={`Place ${userReview.placeDetails.name}`}
                                  style={{ width: '100%', height: '200px', marginRight: '20px' }}
                              />
                             
                            <div style={{paddingTop:"0.5em"}}>
                             <Rating 
                                 value={userReview.rating}
                              />
                              </div>
                          </Grid>
                             
                             
                      </Grid>
                      <Typography variant="h7" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                          {userReview.title}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                  {userReview.visitDate}
                              </Typography>
                      <Typography variant="body1" style={{ marginBottom: '10px' }}>
                          {userReview.reviewText}
                      </Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <Grid container>

                            {images[userReview.reviewId] && images[userReview.reviewId].map((url, index) => (
                             <Grid item key={index} xs={12} sm={4}>

                            <CardMedia
                                    key={`${userReview.reviewId}-${index}`}
                                    component="img"
                                    image={url}
                                    alt={`Review Image ${index}`}
                                    style={{ width: '100%', height: '200px', margin: '10px 0' }}
                                />
                            </Grid>

                            ))}
                                 </Grid>


                        </CardContent>
                    </Card>
                </Grid>
            ))}
            </div>
        </Grid>
}

             
          </Grid>
    )
}

export default Review;


