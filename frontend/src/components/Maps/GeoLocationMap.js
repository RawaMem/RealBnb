import { useEffect, useState } from 'react';
import Map, { Marker }  from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/maps';
import 'mapbox-gl/dist/mapbox-gl.css';

export function GeoLocationMap({style, latitude, longitude, markerContent, zoom }) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.maps?.token);
    const [viewport, setViewport] = useState({latitude, longitude, zoom: 12})

    useEffect(() => {
        if(!token) dispatch(getToken());
    }, [dispatch, token]);

    useEffect(() => {
        setViewport({latitude, longitude, zoom })
    }, [latitude, longitude])

    const MAPBOX_TOKEN = token

    if (!MAPBOX_TOKEN) return null;
    return (
        <Map
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            style={style}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            >
                <Marker 
                longitude={longitude} 
                latitude={latitude} 
                color="red" 
                anchor="bottom" >                   
                        {markerContent && markerContent}                  
                </Marker>
        </Map>
    )
};