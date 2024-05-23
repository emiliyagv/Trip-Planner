import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '85vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
  mapwrap: {
    position: 'relative',
    width: '80%',
    height: 'calc(100vh - 77px)', /* calculate height of the screen minus the heading */
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
}));

