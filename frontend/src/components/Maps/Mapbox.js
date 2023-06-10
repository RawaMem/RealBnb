import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/maps";
import "mapbox-gl/dist/mapbox-gl.css";

export function MapBox({
  style,
  latitude,
  longitude,
  zoom,
  coordinates,
  validListings,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.maps?.token);
  const [viewport, setViewport] = useState({ latitude, longitude, zoom: 12 });

  useEffect(() => {
    if (!token) dispatch(getToken());
  }, [dispatch, token]);

  useEffect(() => {
    setViewport({ latitude, longitude, zoom: zoom || 12 });
  }, [latitude, longitude, zoom]);

  const MAPBOX_TOKEN = token;

  if (!MAPBOX_TOKEN) return null;
  return (
    <Map
      {...viewport}
      style={style}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {coordinates && validListings ? (
        coordinates.map((item) => (
          <Marker
            longitude={item.longitude}
            latitude={item.latitude}
            color="red"
          >
            {validListings.has(item.id) ? (
              <div
                style={{ fontSize: "15px", color: "red", fontWeight: "bold" }}
              >
                {item.ListingPrices[0].pricePerDay}
              </div>
            ) : (
              <span
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                }}
                class="material-symbols-outlined"
              >
                block
              </span>
            )}
          </Marker>
        ))
      ) : (
        <Marker longitude={longitude} latitude={latitude} color="red" />
      )}
      {/* {coordinates && coordinates.map((item) => (
                    <Marker longitude={item.longitude} latitude={item.latitude} color="red" >
                        <div style={{fontSize: "15px", color: "red", fontWeight: "bold"}}>{item.ListingPrices[0].pricePerDay}</div>
                    </Marker>
                ))} */}
    </Map>
  );
}
