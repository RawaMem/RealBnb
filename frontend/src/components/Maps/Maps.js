import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// const containerStyleExample = {
//   width: '300px',
//   height: '300px',
// };

const Maps = ({ coordinates, containerStyle, apiKey}) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [lng, lat] = coordinates;

  const center = {
    lng: lng || -73.935242,
    lat: lat || 40.730610
};

  if (!apiKey) return null;
  return (
    <>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          clickableIcons={true}
        >
            <Marker position={center}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);