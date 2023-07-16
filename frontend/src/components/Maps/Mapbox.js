import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import { useDispatch, useSelector } from "react-redux";
import { clearDurations, getToken } from "../../store/maps";
import { Modal } from "../../context/Modal";
import "mapbox-gl/dist/mapbox-gl.css";
import ListingCard from "../Listings/ListingCard";
import { useCalculateDistanceBetweenListings } from "../../hooks/MapBox";
import { useDetermineZoom } from "../../hooks/MapBox/Matrix/useDetermineZoom";

export function MapBox({
  style,
  latitude,
  longitude,
  zoom,
  coordinates,
  validListings,
  hoveredListing,
  filteredLists,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.maps?.token);
  const [viewport, setViewport] = useState({ latitude, longitude, zoom: 12 });
  const [showListing, setShowListing] = useState(false);
  // Made it a custom hook to separate a bit of the logic and so that the map looks more like just a map while the logic happens somewhere else.
  // https://stackoverflow.com/questions/72455157/react-has-detected-a-change-in-the-order-of-hooks
  const durations = 
  useCalculateDistanceBetweenListings(token, filteredLists, "driving");
  const zoomBasedOnDistance = useDetermineZoom(durations);

  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [initialZoom, setInitialZoom] = useState(zoom);

  useEffect(() => {
    if (zoomBasedOnDistance) setCurrentZoom(filteredLists.length ? zoomBasedOnDistance : 1);
  }, [zoomBasedOnDistance]);

  useEffect(() => {
    if (!token) dispatch(getToken());
  }, [dispatch, token]);

  useEffect(() => {
    if (zoom - initialZoom >= 1) {
      setInitialZoom(zoom);
      setCurrentZoom((prevZoom) => prevZoom + 1);
    }

    if (zoom - initialZoom <= -1) {
      setInitialZoom(zoom);
      setCurrentZoom((prevZoom) => prevZoom - 1);
    }
  }, [zoom]);

  useEffect(() => {
    setViewport({ latitude, longitude, zoom: currentZoom });
  }, [latitude, longitude, currentZoom]);


  useEffect(() => {
    return () => dispatch(clearDurations());
  }, [])

  const MAPBOX_TOKEN = token;

  if (!MAPBOX_TOKEN) return null;
  return (
    <Map
      {...viewport}
      style={style}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={event => setViewport(event.viewState)}
    >
      {coordinates && validListings ? (
        coordinates.map((item) => (
          <Marker
            key={item.id}
            longitude={item.longitude}
            latitude={item.latitude}
            color="red"
          >
            {validListings.has(item.id) ? (
              <div
                onClick={() => setShowListing(item.id)}
                key={item.id}
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
                key={item.id}
                onClick={() => setShowListing(item.id)}
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                  backgroundColor:
                    hoveredListing !== null && hoveredListing === item.id
                      ? "black"
                      : "transparent",
                }}
                className="material-symbols-outlined"
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
