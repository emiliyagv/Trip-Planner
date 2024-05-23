import {  makeStyles } from '@mui/styles';
import {  alpha } from '@mui/material/styles';



const useStyles= makeStyles((theme) => ({

    buttonstyle: {
      
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
      
      }
    },
    linkstyle: {
 
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
}));

export default useStyles;