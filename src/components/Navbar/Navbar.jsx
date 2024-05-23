import React, {useState} from 'react';
import {AppBar, Toolbar, Button,Typography, Tooltip, Avatar, Box, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faPlane } from '@fortawesome/free-solid-svg-icons/faPlane';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faSignIn } from '@fortawesome/free-solid-svg-icons/faSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import useStyles from './styles';
import { useEffect } from 'react';
import {auth, db} from '../../config/firebase-config'
import {signOut} from 'firebase/auth'
import { UserAuth } from '../../context/AuthContextProvider';
import {useNavigate} from 'react-router-dom'
import {doc, getDoc } from "firebase/firestore"; 

const settings =
[
  {title : 'Profile',
    icon: <FontAwesomeIcon icon={faHouseUser} />,
    url: '/Profile'},
  {title :'Logout',
    icon: <FontAwesomeIcon icon={faMessage} />,
    url: '/'}
    
  ]
const pages = [
  {title : 'Home',
    icon: <FontAwesomeIcon icon={faHouseUser} />,
    url: '/'},
  {title :'Discover',
    icon: <FontAwesomeIcon icon={faGlobe} />,
    url: '/Discover'},
  {title :'Trips',
    icon: <FontAwesomeIcon icon={faPlane} />,
    url: '/Trips'},
  {title :'Review',
    icon: <FontAwesomeIcon icon={faMessage} />,
    url: '/Review'}
    
  ]



const Navbar = ({setCoordinates}, props) => {
    const {user} = UserAuth();
    const classes = useStyles();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [profilePhoto, setProfilePhoto] = useState('')
    const navigate = useNavigate();


    const drawerWidth = 240;



    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(() => {
      const getData = async () => {
        if (user?.uid) {
       
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().name)
          if (docSnap.exists()) {
           
            setProfilePhoto(docSnap.data().photoURL || '');
     
          } else {
            console.log("No such document!");
          }
        }
      };

      getData();
    }, [user]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [usernav, setUserNav] = useState({})
  


  async function handleSignOut() {
    setAnchorElUser(null);
    try{

      await signOut(auth)
    }catch{
      console.log(error)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigateHome = () => {
    navigate('/')
  }

 
useEffect(() => {
    console.log(user)
    user ? setUserNav({key: "Profile" , text: "Logout" , clickfunc: handleSignOut,  url : "/"})  : setUserNav({key: "Signup" , text: "Log In/Sign Up" , clickfunc: () => {}, url : "/Signup"})

  }, [user])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', transition: '0.3 ease-in-out' }} className={classes.responsivemenuiconbutton}>
   
      <Divider /> 
      <List>
        {pages.map((page, index) => (
          <ListItem key={index} disablePadding component={Link} className={classes.link}  to={`${page.url}`}> 
            <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemIcon>
                  {page.icon}
            </ListItemIcon>
            <ListItemText primary={`${page.title}`}/>

                    
             </ListItemButton>
          </ListItem>
        ))}
        
        {(usernav.key == 'Profile') ? (
            <></>
              
        ) : (
          <ListItem key={usernav.key} disablePadding component={Link} onClick={usernav.clickfunc} to={usernav.url} className={classes.signup}> 
          <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemIcon>
          <FontAwesomeIcon icon={faSignIn} />
          </ListItemIcon>

          <ListItemText primary={usernav.text}/>

                  
          </ListItemButton>
        </ListItem>
        )}
       
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <AppBar position="static" zIndex="888" sx={{bgcolor: "#fafafa", boxShadow: 'none' }} >
      <Container maxWidth="xl" >
            <Toolbar className={classes.toolbar} disableGutters>
            {(usernav.key == 'Profile') ? (
  <Box sx={{ flexGrow: 0, display: { xs:'flex', sm:'flex', md :'none'}}}>
           <Tooltip title="Open settings">
           <IconButton onClick={handleOpenUserMenu} sx={{ marginRight: 15 }}>
             <Avatar alt="profileimage" src={profilePhoto}/>
           </IconButton>
         </Tooltip>
             <Menu
             sx={{ mt: '45px' }}
             id="menu-appbar"
             anchorEl={anchorElUser}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             keepMounted
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             open={Boolean(anchorElUser)}
             onClose={handleCloseUserMenu}
           >
             {settings.map((setting, index) => (
               <MenuItem key={index} onClick={(setting.title=='Logout') ? usernav.clickfunc : handleCloseUserMenu}>
                 <Link className={classes.link} to={setting.url}>
                      {setting.title}
                    </Link>               
                    </MenuItem>
             ))}
           </Menu>
           </Box>
              
            
        ): (<></>)}
                <Typography variant="h5"  fontSize='1.65rem' fontWeight='600' onClick={navigateHome}
                 sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: { xs:'center', lg:'flex-start'}, fontSize: '1.65rem', fontWeight: '600', marginRight:"1em" }}
                 className={classes.title}>
                    Trip Planner
                </Typography>
               <Box display="flex">


          <IconButton
            className={classes.responsivemenuiconbutton}
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon  />
          </IconButton>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
   


          <Box className={classes.menuitems}>
            {pages.map((page, index) => (
              <Button  
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, space: 1, display: 'block' }
                
              }
              >
                 <Link className={classes.link} to={`${page.url}`}>
                        {page.icon} 
                        <span style={{ paddingLeft: '7px' }}>{page.title}</span> 
                    </Link>
              </Button>
            ))}


{(usernav.key == 'Profile') ? (
  <Box sx={{ flexGrow: 0 }}>
           <Tooltip title="Open settings">
           <IconButton onClick={handleOpenUserMenu} sx={{ marginRight: 15 }}>
             <Avatar alt="profileimage" src={profilePhoto} />
           </IconButton>
         </Tooltip>
             <Menu
             sx={{ mt: '45px' }}
             id="menu-appbar"
             anchorEl={anchorElUser}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             keepMounted
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             open={Boolean(anchorElUser)}
             onClose={handleCloseUserMenu}
           >
             {settings.map((setting, index) => (
               <MenuItem key={index} onClick={(setting.title=='Logout') ? usernav.clickfunc : handleCloseUserMenu}>
                 <Link className={classes.link} to={setting.url}>
                      {setting.title}
                    </Link>               
                    </MenuItem>
             ))}
           </Menu>
           </Box>
              
        ) : (
               <Button  
               className={classes.signup}
                key={usernav.key}
                onClick={usernav.clickfunc} 
                >
                   <Link  className={classes.signuplink} to={usernav.url}>
                      {usernav.text}
                    </Link>
              </Button>
        )}
                  </Box>

                </Box>
            </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Navbar;


