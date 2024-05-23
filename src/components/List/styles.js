import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({


  selectEmpty: {
    marginTop: theme.spacing(20),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    alignSelf:"end"
  },
  formdiv: {
    marginTop: '15px'
  },
  formcontrol: {
    margin: theme.spacing(2), minWidth: 120, marginBottom: '100px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    marginTop: "1em !important",
    alignItems: 'center',
    justifyContent: "center",
    padding: theme.spacing(2),
    overflow: "hidden" 

   
  },

}));