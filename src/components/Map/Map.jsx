import React, { useRef, useEffect} from 'react';
import { Map, MapStyle, config, Marker } from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import useStyles from './styles';
import { MAPTILER_API_KEY } from '../../../env';


export default function MapComp({places, setCoordinates, setBounds, coordinates, zoom}) {
  const classes= useStyles();
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    
    if (!MAPTILER_API_KEY) {
      console.error('MapTiler API key is missing');
      return;
    }
    config.apiKey = MAPTILER_API_KEY;

      if (map.current) {
        map.current.remove(); 
      }
   const mapRef = new Map({
      container: mapContainer.current,
      style: MapStyle.STREETS,
      center:  [coordinates.lng, coordinates.lat],
      zoom: zoom
    });
    map.current=mapRef
    setBounds({ne: map.current.getBounds()._ne, sw: map.current.getBounds()._sw})

    map.current.on('click', function(e) {
      setCoordinates({ lat: e.lngLat.lat, lng: e.lngLat.lng})
      });
      places?.map((place) => (
        place.latitude &&
        new Marker({color: "#FF0000"})
      .setLngLat([parseFloat(place.longitude), parseFloat(place.latitude)])
      .addTo(map.current)
      ))

      const recenterMap = () => {
        const center = [coordinates.lng, coordinates.lat];
        map.current.setCenter(center);
      };
    
      window.addEventListener('resize', recenterMap);
    
      return () => {
        window.removeEventListener('resize', recenterMap);
      };
      
  }, [coordinates, zoom]);
  

  return (
      <div ref={mapContainer} className={classes.map} />
  );
}

