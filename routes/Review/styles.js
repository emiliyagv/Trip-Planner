import {  makeStyles } from '@mui/styles';

const useStyles= makeStyles(theme => ({
    card: {
        maxHeight: 350,
        maxWidth: 200, 
    },
    container:{
        margin:"auto",
        marginTop:"8em"
    },
    cardGridReview:{
        marginTop:"10px",
        display:"flex",
        justifyContent: "center"
    },
    cardGrid: {
        marginTop:"1.5em !important"
    },
reviewButton: {
    '&.MuiButton-root' : {
        padding: "0.5 1rem",
        whiteSpace:"nowrap",
        borderRadius:"0.3rem",
        color: 'white',
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
    buttonStyle:{
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
    }
}))

export default useStyles;