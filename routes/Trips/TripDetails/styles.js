import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
      marginTop: "4em",
      height: "100vh", 
      padding: 0,
      overflow: 'hidden',  
      },
      gridContainer: {
   
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column'
      },
  
      backgroundPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:"center",
        minHeight: '100%',
        width: '100%',
        '&::before': {
          content: '""',
          backgroundPosition: 'center', 
          backgroundSize: '150px',
          width: '100%',
          height: '100%',
          zIndex: -1, 

      }},
      innerPaper: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          minWidth: '60%',
          minHeight: "40%",
          textAlign: 'center',
          alignSelf: "center",
          zIndex: 2, 
      },
      backgroundContainer: {
        backgroundPosition: 'center', 
        width: '100%',
        height: '100%',
        minHeight:"45vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
      },
        title: {
          marginTop: "2rem !important"

        },
        subtitle: {
            marginTop: "3rem !important",
        },
        explore:{
          marginTop: "3em !important",
          alignItems: 'center',
          justifyContent: "center"
        },
    
      detailsPanel: {
        maxHeight: "100%", 
        overflowY: 'auto', 
        padding: theme.spacing(2), 
        zIndex: 1,
        position: "absolute",

      },
      paper: {
        height: '100%', 
      },
      mapPanel: {
        height: 'calc(100vh - 77px)', 
                width:"80%",
        zIndex: 0,
        position:"relative",
        float: "right"
        

      },
        
    root: {
          flexGrow: 1,
          margin: theme.spacing(2),
          marginTop: "5em",
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        button: {
          margin: theme.spacing(1),
        },
        details: {
          marginTop: theme.spacing(2),
        }
      
}));

export default useStyles;
