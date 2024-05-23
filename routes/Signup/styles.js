import {  makeStyles } from '@mui/styles';
import {  alpha } from '@mui/material/styles';



const useStyles= makeStyles(theme => ({


gitbutton:{
    '&.MuiIconButton-root' : {
        color: "#222"
    }
},

fbbutton:{
    '&.MuiIconButton-root' : {
        color: "#316FF6"
    }
},

buttons: {
    '&.MuiButton-root' : {
        borderRadius: '8px', 
        
        backgroundColor: '#333', 
        color: 'white', 
        '&:hover': {
          backgroundColor: 'black'
    }
}
}

}))

export default useStyles;