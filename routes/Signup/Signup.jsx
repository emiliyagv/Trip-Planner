import * as React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {auth} from '../../src/config/firebase-config'
import {GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { setDoc,doc, getDoc } from "firebase/firestore"; 
import { UserAuth } from '../../src/context/AuthContextProvider';

import {db} from '../../src/config/firebase-config'

import useStyles from './styles';


const Signup = () => {
  const classes= useStyles()
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginpassword, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user } = UserAuth();
  const errors = {
    "auth/invalid-email" : "Email is not provided" ,
    "auth/missing-password" : "Password is not provided" ,
    "auth/weak-password" : "Password is weak",
    "auth/email-already-in-use" : "Email is already in use",
    "noname" : "Name is not provided"
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordSetUp = (event) => {
    setPassword(event.target.value);
  };



   

    const handleSubmitLogIn = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
          const email= data.get('email')
         console.log(email, loginpassword)
         signInWithEmailAndPassword(auth, email, loginpassword)
         .then((userCredentials) =>
         {
           const user = userCredentials.user
           console.log(user)
           navigate('/');

         }).catch((error) => {
          setError(errors[error.code])
      })
      };

      const handleProviderLogin = (provider) => {
        let Provider;
        switch(provider) {
          case "google":
            Provider = new GoogleAuthProvider();
            provider = GoogleAuthProvider
            break;
          case "facebook":
            Provider = new FacebookAuthProvider();
            provider = FacebookAuthProvider
            break;
          case "twitter":
            Provider = new TwitterAuthProvider();
            provider = TwitterAuthProvider
            break;
        }
      signInWithPopup(auth, Provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;

          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            navigate('/')
            return
          }


         await setDoc(doc(db, "users", user.uid ), {
            name: user.displayName,
            email :  user.email,
            photoURL: user.photoURL,
            trips: []
          });
          navigate('/')
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        })
      }

    const handleSubmitSignUp =  (event) => {
        event.preventDefault();
         const data = new FormData(event.currentTarget);

         const email= data.get('email')
         const password= data.get('password')
         if(data.get('firstName') === "" ){
          setError(errors['noname'])
          return;
         }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>
        {
          const user = userCredentials.user
          setDoc(doc(db, "users", user.uid ), {
            name: `${data.get('firstName')} ${data.get('lastName')}`,
            email : data.get('email'),
            trips: []
          });
          navigate('/');
        }).catch((error) => {
            setError(errors[error.code])
        })
    ;
  
      };


 
   

  return (
    
    
   <Grid container justifyContent="center" margin="auto" width="80%">
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Paper elevation={3} sx={{ p: 4, mt: "40px", borderRadius: 4}}>

        <Link to='/' style={{ color: '#6c757d', textDecoration: 'none', alignSelf:"center" }}>
        <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '0.5rem' }} />
          Back to home page
          </Link>

      {isSignup ? ( 
        
        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center',
          width: "100%",
          minHeight: "80vh",
        }}>
      
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" margin={10}>
                Login
              </Typography>
              <Box justifyContent="center" component="form" noValidate onSubmit={handleSubmitLogIn} sx={{ mt: 3, mx: 15}}>
              <Grid container spacing={2}>
            <Box alignContent="center" width="100%">
              <Grid item xs={12} >

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => {setError('')}}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <FontAwesomeIcon icon={faEnvelope}/>
                       </InputAdornment>,
                  }}
                />
               </Grid>
          <Grid item xs={12}>
            <FormControl  onChange={(e) => {setError('')}} fullWidth sx={{ m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordSetUp}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
              
                </Grid>
                </Box>
                {/* <Grid item xs={12} sx={{ mt: 12 }}>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                </Grid> */}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 30, mb: 2 }}
                  className={classes.buttons}
                >
                  Login
                </Button>
                { error &&
            <div>
            <Typography color="error"  textAlign="center" marginTop='1rem'>
              {error}
        </Typography>
          </div>
}
                <div style={{ marginTop: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      <span style={{ fontWeight: 'normal', marginTop: '5px'}}>or login with</span>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', marginTop: '1rem'}}>
      <IconButton onClick={() => handleProviderLogin("google")}  variant="outlined"  className={classes.gitbutton} sx={{ borderRadius: '8%' }}>
          <FontAwesomeIcon icon={faGoogle} />
          </IconButton>
        <IconButton onClick={() => handleProviderLogin("facebook")} variant="outlined"className={classes.fbbutton}  sx={{ marginRight: '0.5rem', borderRadius: '8%' }}>
        <FontAwesomeIcon icon={faFacebookF} />
        </IconButton>
        <IconButton onClick={() => handleProviderLogin("twitter")}  variant="outlined" color="primary" sx={{ marginRight: '0.5rem', borderRadius: '8%' }}>
        <FontAwesomeIcon icon={faTwitter} />
        </IconButton>
    
      </div>
    </div>


                <Grid container>
      <Grid item xs>
        <Link
          to="/Forgotpassword"
          
          variant="body2"
          style={{ textDecoration: 'none', color: 'inherit',marginRight:'20px' }}
        >
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="#"
          onClick={() => setIsSignup(!isSignup)}
          variant="body2"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
           {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
              </Box>
            </Box>
    ) : (
        
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",

        minHeight: "80vh",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" marginBottom={30}>
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3, mx: 10}}>
        <Grid container spacing={2} sx={{ mb: 2 }} 
>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {setError('')}}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
             onChange={(e) => {setError('')}}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             onChange={(e) => {setError('')}}
              required
              fullWidth
              margin="dense"
              id="email"
              label="Email Address"
              name="email"
              
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={(e) => {setError('')}}
              margin="dense"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
       
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          
          sx={{ mt: 20, mb: 10 }}
          className={classes.buttons}
        >
          Sign Up
        </Button>
        { error &&
            <div>
            <Typography color="error"  textAlign="center" marginTop='1rem'>
              {error}
        </Typography>
          </div>
}
        <Grid container sx={{ mt: 10 }} justifyContent="flex-end">
          <Grid item>
            <Link onClick={() => setIsSignup(!isSignup)}  href="#"
          variant="body2"
          style={{ textDecoration: 'none', color: 'inherit'}}>
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
        )}
        </Paper>
        </Grid>
   </Grid>
    )
}

export default Signup