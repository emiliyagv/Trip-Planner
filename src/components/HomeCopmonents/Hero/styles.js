import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
    bannerContainer: {
        display: 'flex' ,
        justifyContent: "center",
        width : '100%',
        height: '100%',
        padding: '0px 0px',
      
    },

    bannerContent: {
        textAlign: 'center', 
        padding: '10px',
        zIndex: 2,
        color: theme.palette.common.black,
        justifyContent:'flex-start',
        width: '80%',
        maxWidth: 600,
        marginTop: "20%",
        paddingRight: "10%",
        [theme?.breakpoints?.down('sm')]: {
                paddingBottom:'2em',
                marginTop:'10.5em',
                justifyContent:'flex-start',
                paddingRight: "90%",
    
              },

        
          [theme?.breakpoints?.up('sm')]: {
            width: '60%',
            marginTop:'13em',
            marginBottom:'5em',
            justifyContent:'flex-start',
            paddingRight:'3em'
          },
          [theme?.breakpoints?.up('md')]: {
            width: '60%',

            marginBottom:'5em',
            marginTop:'15em',
            justifyContent:'flex-start',
            paddingRight:'3em'
          },
    },
    bannerTitle: {
        marginBottom: '2em'   ,
        [theme?.breakpoints?.down('md')] : {
            '&.MuiTypography-h4': { 
                fontSize: '1.75rem'
              }, 
            },
        [theme?.breakpoints?.down('sm')] : {
            display:'none'        

                  },   
        
    },
    bannerDescription: {
        
        [theme?.breakpoints?.down('md')] : {
            '&.MuiTypography-h7': { 
                fontSize: '0.9rem'
              }, 
            },
       [theme?.breakpoints?.down('sm')] : {
                
        display:'none'        

            
            }, 
     
    },
   
    bannerImage: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: '7em',
        left: 0,
        zIndex: 0,
        [theme?.breakpoints?.up('md')] : {
            height: "650px"
        },
        [theme?.breakpoints?.down('md')] : {
            height: "480px"
        },
        [theme?.breakpoints?.down('sm')]: {
            width: "100%",
            height: "300px",
            order: 1, 

        }

    },
    backgroudImage: {
        width: '100%',
        position: 'absolute',
        top: '7em',
        left: 0,
        [theme?.breakpoints?.up('md')] : {
            height: "650px"
        },
        [theme?.breakpoints?.down('md')]: {
            width: "100%",
            height: "480px",
            order: 0, 
        },
        [theme?.breakpoints?.down('sm')]: {
            width: "100%",
            height: "300px",
            order: 0, 

        },
        zIndex: 1,
      
    },
    imagegrid: {
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        transition: 'background-color 0.5s ease',
        [theme?.breakpoints?.down('sm')]: {
            height: 'auto',
            flexDirection: 'column', 
          },

          [theme?.breakpoints?.up('md')]: {
            height: "700px",

          },

    },
    featuresContainer:{
        [theme?.breakpoints?.down('sm')]: {
           marginTop:'10em' 

            },
            [theme?.breakpoints?.up('sm')]: {
                marginTop:'7em' 
     
                 },
    },
    featuresTitle:{
        [theme?.breakpoints?.down('sm')]: {
            
            '&.MuiTypography-h3': { 
                fontSize: '2rem',
                marginLeft:'1em',
              },

            },
    },
    trplaceTypo:{
        [theme?.breakpoints?.down('sm')]: {
            
            '&.MuiTypography-h3': { 
                fontSize: '2rem',
                marginLeft:'1em',
              }, 

            },

    },
    trplaceContainer:{
        [theme?.breakpoints?.down('sm')]: {
           marginTop:'5em' 

            },
            [theme?.breakpoints?.up('sm')]: {
                marginTop: "15em"     
                 },
    },


}))


