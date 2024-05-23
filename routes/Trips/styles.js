import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: "10em"
    },
    title: {
        textAlign: 'center',
        marginBottom: "1em !important"
    },
    inputField: {
        margin: theme.spacing(10),
    },
    dateInput: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      width: '48%',
    },
    button: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(1.5),
    },
   
    guideText: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }));

export default useStyles;
