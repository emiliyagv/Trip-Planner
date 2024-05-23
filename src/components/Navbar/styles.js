import {  makeStyles } from '@mui/styles';
import {  alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';



const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: '600',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },

    
    color: '#222',
    cursor: 'pointer',
      
   },
  responsivemenuiconbutton: {
    size: "large",
    ariaLabel: "account of current user",
    ariaControls: "menu-appbar",
    ariaHaspopup: "true",
    color: "#222",
    alignSelf:'flex-start'
  },

  signuplink: {
    textalign: "center",
    color: '#222',
    fontSize: '1.2rem',
    fontWeight: '600',
    padding: '0.7rem 1rem',
    textDecoration: "none",
    whiteSpace: 'nowrap' ,
    '&:hover': {
      color: "#fff"

    }
  },
  link: {
    textalign: "center",
    color: '#222',
    fontSize: '1.2rem',
    fontWeight: '600',
    padding: '0.7rem 1rem',
    textDecoration: "none",
    whiteSpace: 'nowrap' ,
    
    '&:hover': {
      backgroundColor: '#01959a',
      color: '#fff', 
      borderRadius: '4px',
      transition: 'all 0.2s ease-in-out'
    },  
    
  },


  menuitems: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, auto)',
    gridGap: '10px',
    alignItems: 'left',
    [theme.breakpoints.up('xs')]: {
      display: 'none',  
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  
  
  toolbar: {
    backgroundColor: alpha(theme.palette.common.white, 1),
        display: 'flex',
     justifyContent: 'space-between',
     alignItems: "center",

     boxShadow: '0 5px 15px 0 rgba(0, 0, 0, .25)',
     width: '95%',
     height: '60px',
     borderRadius: '13px',
     paddingLeft: 35,
     paddingRight: 0,
     position: "fixed",
     top: "20px",
     left: "50%",
     transform: "translate(-50%)"
  },
  signup: {

  '&.MuiButton-root' : {
    padding: "0.5 1rem",
    whiteSpace:"nowrap",
    borderRadius:"0.3rem",
    color: '#222',
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#151516",
      color: '#fff', 
      borderRadius: '4px',
      transition: 'all 0.2s ease-in-out'
}
  },
  '&.MuiListItem-root' : {
    padding: "0.5 1rem",
    whiteSpace:"nowrap",
    borderRadius:"0.3rem",
    color: '#222',

    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    '&:hover': {
    backgroundColor: "#151516",
    color: '#fff', 
    borderRadius: '4px',
    transition: 'all 0.2s ease-in-out'
}
}

        
  },  
  
  
}));

export default useStyles;