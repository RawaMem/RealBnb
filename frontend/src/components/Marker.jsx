import { useEffect, useState } from 'react';

export default function Marker(options) {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    console.log('this is the marker => ', marker);
    console.log('this is the latitude => ', options.position.lat());
    console.log('this is the longitude => ', options.position.lng());
    return null;
}