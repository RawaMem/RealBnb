import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistancesBetweenListings } from "../../../store/maps";

/**
 * useCalculateDistanceBetweenListings is a custom hook that returns an array of durations, in seconds, between listings. This makes use of the MapBox Matrix API.
 * @param {String} token the MapBox API token.
 * @param {ListingsArray} filteredLists the listings associated with the current wishlist.
 * @param {String} profile A Mapbox Directions routing profile ID. A profile ID could be driving, walking, cycling or driving-traffic.
 * @returns {Array} an array of durations, in seconds, between listings.
 */
export function useCalculateDistanceBetweenListings(
  token,
  filteredLists,
  profile
) {
  const dispatch = useDispatch();
  const { durations } = useSelector((state) => state.maps);

  useEffect(() => {
    // Since request is sometimes sending an empty array, we need to make sure that the token and filteredLists are not empty.
    if (token && filteredLists.length) {
      dispatch(getDistancesBetweenListings(token, filteredLists, profile));
    }
  }, [token, profile, filteredLists]);

  return durations;
}
