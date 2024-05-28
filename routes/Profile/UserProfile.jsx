/* eslint-disable react/jsx-key */
import { useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../../src/context/AuthContextProvider'
import {doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db, storage } from '../../src/config/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useStyles from '../../src/components/TripDetailsComponents/styles';
import {Paper, Divider} from '@mui/material';
import CityPhoto from './CityPhoto';

import {
    Avatar,
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent, 
    IconButton,
    Badge,
    styled,
    TextField,
    Dialog, DialogActions, DialogContent, DialogTitle,
  } from '@mui/material';
  import { Edit, Share} from '@mui/icons-material';
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));



const UserProfile = () => {
    const {user} = UserAuth();
    const [trips, setTrips] = useState([])
    const [currentslide, setcurrentslide] = useState(0);
    const sliderRef = useRef(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(user.photoURL || '');
    const [imageFile, setImageFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('')
    const navigate = useNavigate();

    const handleCardClick = (item) => {
        navigate('/tripdetails', { state: { data: item } });
    };
    const initSlider = () => {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0); 
        }
      };

      const handleOpenEditDialog = () => setOpenEditDialog(true);
      const handleCloseEditDialog = () => setOpenEditDialog(false);

      const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setProfileImage(URL.createObjectURL(file));
        }
    };
  

    useEffect(() => {
      const getData = async () => {
        if (user?.uid) {
       
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setName(docSnap.data().name || '');
            setEmail(docSnap.data().email || '');
            setProfileImage(docSnap.data().photoURL || '');
            const tripsData = docSnap.data().trips;
            if (Array.isArray(tripsData)) {
              setTrips(tripsData);
            } else {
              console.error('Trips is not an array');
            }
          } else {
            console.log("No such document!");
          }
        }
      };

      getData();
    }, [user]);

     useEffect(() => {
      if (trips.length) {
        initSlider();
      }
    }, [trips]);

    async function uploadPhotoAndGetURL(file) {
      const fileRef = ref(storage, `profileimages/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
  }

    const handleSaveChanges = async () => {
      try {
         let newPhotoUrl;
          if (imageFile) {
              newPhotoUrl = await uploadPhotoAndGetURL(imageFile)
              setProfileImage(newPhotoUrl); 
          }
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
              name: name,
              email: email,
              photoURL: newPhotoUrl
          });
      } catch (error) {
          console.error("Error updating profile:", error);
      }
      handleCloseEditDialog();
  };
  


     const handleDelete = async (indexToDelete) => {
      event.stopPropagation();
      const tripsRef = doc(db, "users",  user.uid);
      const tripRef = await getDoc(tripsRef);
      const data = tripRef.data();
      const oldtrips = data.trips || [];
      oldtrips.splice(indexToDelete, 1)
      setTrips(oldtrips)
      const userRef = doc(db, "users",  tripRef.id);

      await updateDoc(userRef, {
        trips : oldtrips,
      });

  };



  


     const NextArrow = ({ onClick, ...props }) => {
      const isLastSlide = currentslide >= (trips.length - sliderSettings.slidesToShow);      
      return !isLastSlide && (
           <Button {...props} onClick={onClick} style={{
             ...props.style,
           right: "-25px",
           position: "absolute",
           top: "50%",
           width: "40px",
           height: "40px",
           minWidth: "40px",
           backgroundColor: "white",
           borderRadius: "50%",
           zIndex: 2,
           transform: "translateY(-50%)",
           border: "none",
           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         }}>
           <ArrowForwardIosIcon
            style={{
              fontSize: 'large',
             color: "black",
             position: 'relative',
             left: '-8px'  }}
             />
           </Button>
         );
       };
 
       const PrevArrow = ({ onClick, ...props }) => {
         return currentslide !== 0 && (
           <Button {...props} onClick={onClick} style={{
             ...props.style,
           right: "-25px",
           position: "absolute",
           top: "50%",
           width: "40px", 
           height: "40px", 
           minWidth: "40px",
           backgroundColor: "white",
           borderRadius: "50%",
           zIndex: 2,
           transform: "translateY(-50%)", 
           border: "none", 
           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center', 
         }}>
           <ArrowBackIosIcon 
           style={{   fontSize: 'large', 
             color: "black",
             position: 'relative',
             left: '-6px'  }} 
             />
           </Button>
         );
        };

         const sliderSettings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: Math.min(3, trips?.length),
          slidesToScroll: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
          beforeChange: (current, next) => setcurrentslide(next),
          afterChange: (current) => setcurrentslide(current),
              responsive: [
          {
            breakpoint: 1070, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              
            }
          },
          {
            breakpoint: 700, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              
            }
          }
        ]
        }; 
        const classes = useStyles();

    return (
        <div style={{marginTop: "8em"}}>
        <Grid container spacing={3} sx={{ display:"flex", justifyContent:"space-evenly"}}>
          <Grid item xs={8} sm={5} lg={3} sx={{ marginLeft:"1em",textAlign: 'center' ,marginBottom: {sm:"30px", xs: "40px", md:"0"}}}>
            <div style={{border: '1px solid white', borderRadius: '3%', boxShadow: "0 0 2px black", padding:"3em"}} >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                alt={name}
                src={profileImage}
                sx={{ width: 128, height: 128, margin: 'auto' }}
              />
            </StyledBadge>
            <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
              {name}
            </Typography>
            <Typography variant="subtitle1">{email}</Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button variant="contained" startIcon={<Edit />} onClick={handleOpenEditDialog}>Edit</Button>
              <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" paddingBottom={2}>
            <input
                accept="image/*"
                type="file"
                id="upload-photo"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            <label htmlFor="upload-photo">
                <IconButton component="span" style={{ padding: 0 }}>
                    <Avatar
                        src={profileImage}
                        alt={name}
                        sx={{ width: 90, height: 90, marginBottom: 2 }}
                    />
                </IconButton>
            </label>
            <Typography variant="caption" gutterBottom>
                Change profile photo
            </Typography>
        </Box>
        <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
            margin="dense"
            id="password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                 <Button onClick={handleSaveChanges}>Save</Button>
                </DialogActions>
            </Dialog>
            </Box>
          
            </div>
            </Grid>
     <Grid item xs={12} sm={9} lg={8} sx={{ display:"flex",justifyContent:"center"}} >
      <Paper elevation={3} square={false}             
 style={{ padding: '50px', position: 'relative' }}>
      <Typography variant="h4" align="center" fontWeight={400} gutterBottom>
        Your Trips
      </Typography>
      <Divider />
        {trips.length > 0 && (

        <Slider ref={sliderRef} {...sliderSettings} className={classes.list} style={{ marginTop:'3em'}}>
        {trips.map((item, index) => (
          <div key={index}>
 
         <Card key={index} className={classes.usercard}>
       
        <div key={index} onClick={() => handleCardClick(item)}>
        <CityPhoto cityName={item.tripData.title.split(" ")[2]}/>
        
        <CardContent >
          <Typography gutterBottom variant="h7" component="div">
            {item.tripData.title}
          </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
         {item.tripData.startDate} - {item.tripData.endDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.userPlaces.length} places
            </Typography>
          
      
        </CardContent>
        </div>
              
                <>
                <IconButton onClick={(event) => handleDelete(index, event)} sx={{ marginLeft: 'auto' }}>
                        <DeleteIcon />
                </IconButton>
                </>
                </Card>
            </div>
         ))} 
        </Slider>
  )}
  </Paper>
            </Grid>
          </Grid>
    </div>
      );
}

export default UserProfile