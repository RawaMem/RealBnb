import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/maps";
import { Modal } from "../../context/Modal";
import "mapbox-gl/dist/mapbox-gl.css";
import ListingCard from "../Listings/ListingCard";

export function MapBox({
  style,
  latitude,
  longitude,
  zoom,
  coordinates,
  validListings,
  hoveredListing,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.maps?.token);
  const [viewport, setViewport] = useState({ latitude, longitude, zoom: 12 });
  const [showListing, setShowListing] = useState(false);

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
                onClick={() => setShowListing(item.id)}
                style={{
                  fontSize: "15px",
                  color: "red",
                  fontWeight: "bold",
                  backgroundColor:
                    hoveredListing !== null && hoveredListing === item.id
                      ? "black"
                      : "transparent",
                }}
              >
                {item.ListingPrices[0].pricePerDay}
              </div>
            ) : (
              <span
                onClick={() => setShowListing(item.id)}
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                  backgroundColor:
                    hoveredListing !== null && hoveredListing === item.id
                      ? "black"
                      : "transparent",
                }}
                class="material-symbols-outlined"
              >
                block
              </span>
            )}
            {showListing === item.id && (
              <Modal onClose={() => setShowListing(null)}>
                <ListingCard listing={item} />
              </Modal>
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
