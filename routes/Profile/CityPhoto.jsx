import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import { GoogleApiWrapper, PlacesService } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../../env';

const CityPhoto = ({ google, cityName }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  const fetchCityPhoto = () => {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.findPlaceFromQuery({ query: cityName, fields: ['photos'] }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const place = results[0];

        if (place.photos && place.photos.length > 0) {
          const photoReference = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
          setPhotoUrl(photoReference);
        } else {
          console.log('No photos found for this city.');
        }
      } else {
        console.error('Error fetching city:', status);
      }
    });
  };

  if (google) {
    fetchCityPhoto();
  }

  return (
    <div>
      {/* Render CardMedia with the fetched photo URL */}
      {photoUrl && (
        <CardMedia
          component="img"
          height="130"
          width="80"
          image={photoUrl}
          alt={cityName}
        />
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
})(CityPhoto);