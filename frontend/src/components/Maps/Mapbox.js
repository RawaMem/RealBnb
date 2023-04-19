import { useEffect, useState } from 'react';
import Map, { Marker }  from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/maps';
import 'mapbox-gl/dist/mapbox-gl.css';

export function MapBox({style, latitude, longitude }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.maps?.token);
    const [viewport, setViewport] = useState({latitude, longitude, zoom: 12})

    useEffect(() => {
        if(!token) dispatch(getToken());
    }, [dispatch, token]);

    useEffect(() => {
        setViewport({latitude, longitude, zoom:12})
    }, [latitude, longitude])

    const MAPBOX_TOKEN = token

    if (!MAPBOX_TOKEN) return null;
    return (
        <Map
            {...viewport}
            style={style}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            >
                <Marker longitude={longitude} latitude={latitude} color="red" />
        </Map>
    )
}