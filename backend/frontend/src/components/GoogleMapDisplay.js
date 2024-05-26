import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { isEqual } from 'lodash';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const GoogleMapDisplay = ({ origin, destination, stops }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const directionsResponseRef = useRef(null);

    const directionsOptions = useMemo(() => {
        const options = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
            optimizeWaypoints: true
        };
        if (stops && stops.length > 0) {
            options.waypoints = stops.map(stop => ({ location: stop, stopover: true }));
        }
        return options;
    }, [origin, destination, stops]);

    const directionsCallback = useCallback((response) => {
        if (response !== null) {
            if (response.status === 'OK' && !isEqual(directionsResponseRef.current, response.routes)) {
                directionsResponseRef.current = response.routes;
                setDirectionsResponse(response);
            } else {
                console.error('Directions request failed:', response);
            }
        }
    }, []);

    const center = useMemo(() => ({
        lat: (origin.lat + destination.lat) / 2,
        lng: (origin.lng + destination.lng) / 2
    }), [origin, destination]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyC8iYY7EaXavgzX87mWUhDdjrNs-hMf0n0">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
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
                {stops && stops.map((stop, index) => (
                    <Marker key={index} position={stop} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapDisplay;
