import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { isEqual } from 'lodash';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const GoogleMapDisplay = ({ origin, destination }) => {
  const [map, setMap] = useState(null);
  const directionsResponseRef = useRef(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const directionsOptions = React.useMemo(() => ({
  destination: destination,
  origin: origin,
  travelMode: 'DRIVING'
}), [destination, origin]);

const directionsCallback = React.useCallback((response) => {
  if (response !== null) {
    if (response.status === 'OK' && !isEqual(directionsResponseRef.current, response.routes)) {
      directionsResponseRef.current = response.routes;
      setDirectionsResponse(response);
    } else {
      console.error('Directions request failed:', response);
    }
  }
}, [destination, origin])


  return (
    <LoadScript googleMapsApiKey="AIzaSyC8iYY7EaXavgzX87mWUhDdjrNs-hMf0n0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={setMap}
        center={{ lat: 51.759445, lng: 19.457216 }}
        zoom={10}
      >
        <DirectionsService
          options={directionsOptions}
          callback={directionsCallback}
        />
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapDisplay

