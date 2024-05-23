import {  makeStyles } from '@mui/styles';
import {  alpha } from '@mui/material/styles';



const useStyles= makeStyles((theme)=> ({

  typographyStyle:{
    [theme.breakpoints.down('md')]: {
      '&.MuiTypography-h3': { 
        fontSize: '2rem'
      }
    }
  },
  mapwrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',  
    width: '80%',                  
    margin: 'auto',
    overflow: 'hidden',
  },

}))

export default useStyles;