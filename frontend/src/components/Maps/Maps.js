import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// const containerStyleExample = {
//   width: '300px',
//   height: '300px',
// };

const Maps = ({ coordinates, containerStyle }) => {

  const apiKey = useSelector((state) => state.maps?.key);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!apiKey) {
        dispatch(getKey());
    }
  }, [dispatch, apiKey]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [lng, lat] = coordinates;

  const center = {
    lng: lng || -73.935242,
    lat: lat || 40.730610
};

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