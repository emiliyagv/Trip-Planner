import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({


  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  compactCardContent: {
  

    padding: "8px !important",
    [theme?.breakpoints?.up('sm')]: {
      padding: "8px !important",
    },
    [theme?.breakpoints?.up('sm')]: {
      '& .MuiTypography-h6': { 
        fontSize: '1.2rem'
      },
      '& .MuiSvgIcon-root': { 
        fontSize: '1rem'
      }
    },
     [theme?.breakpoints?.down('sm')]: {
      '& .MuiTypography-h6': { 
        fontSize: '0.70rem'
      },

      '& .MuiTypography-caption': { 
        fontSize: '0.48rem'
      },
      '& .MuiTypography-subtitle2': { 
        fontSize: '0.48rem'
      },
      '& .MuiSvgIcon-root': { 
        fontSize: '0.5rem'
      }
    },

  },
  hearderText:{
    
      [theme?.breakpoints?.up('sm')]: {
        fontSize: '2rem', 
      },
      [theme?.breakpoints?.up('sm')]: {
        fontSize: '1.25rem',
      },

},
  divStyle:{
  
   [theme.breakpoints.up('sm')]: {
    maxWidth: 271,
    maxHeight: 455,
  },
   [theme.breakpoints.down('sm')]: {
    maxWidth: 150,
    maxHeight: 250,
  },
  },
  cardStyle: {
    [theme.breakpoints.up('sm')]: {
      height: 250,
    },
    [theme.breakpoints.down('sm')]: {
      height: 120,
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding:"0 !important"
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
}));