import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    card: {
        height: 370,
        maxWidth: 200, 
        [theme?.breakpoints?.down('md')]: {
          maxWidth: 150,
          height: 120,
        },
       

    },
    usercard:{
        height: 280,
        maxWidth: 200, 
    },
    slider:{
        marginLeft:0,
        [theme?.breakpoints?.down('md')]: {
            marginLeft:70     }
       
    }
    , 
    chip: {
        margin:2
    },
    list: {
        [theme?.breakpoints?.up('md')]: {
            width:"650px"
           
          },
        [theme?.breakpoints?.down('md')]: {
            width:"380px"

          },
          [theme?.breakpoints?.down('xs')]: {
           width:"350px"

          },
    
     
      },
      placeButton: {
        '&.MuiButton-root' : {
          padding: "0.5 1rem",
          whiteSpace:"nowrap",
          borderRadius:"0.3rem",
          color: 'black',
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
    