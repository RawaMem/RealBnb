import { csrfFetch } from "./csrf";

const LOAD_API_KEY = "maps/LOAD_API_KEY";
const LOAD_ACCESS_TOKEN = "maps/LOAD_ACCESS_TOKEN";
const CALCULATE_DISTANCE = "maps/CALCULATE_DISTANCE";

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

const loadAccessToken = (key) => ({
  type: LOAD_ACCESS_TOKEN,
  key,
});

function calculateDistance(distances) {
  return {
    type: CALCULATE_DISTANCE,
    distances,
  };
}

export const getKey = () => async (dispatch) => {
  const res = await csrfFetch("/api/maps/key", {
    method: "POST",
  });
  const data = await res.json();
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

export const getToken = () => async (dispatch) => {
  const res = await csrfFetch("/api/maps/accessToken", {
    method: "POST",
  });
  const token = await res.json();
  dispatch(loadAccessToken(token.mapboxAccessToken));
};

export function getDistancesBetweenListings(token, listings, profile) {
  return async function (dispatch, getState) {
    const { distances } = getState().maps;
    if (distances && Object.keys(distances).length) return;
    try {
      const formattedCoordinates = listings.map(
        (listing) => `${listing.longitude},${listing.latitude};`
      );
      const stringOfCoordinates = formattedCoordinates.join("");
      const query = `?profile=${profile}&coordinates=${stringOfCoordinates.slice(
        0,
        stringOfCoordinates.length - 1
      )}&token=${token}`;
      const response = await csrfFetch(`/api/distanceMatrix${query}`);
      const distances = await response.json();
      dispatch(calculateDistance(distances.distances));
    } catch (error) {
      const data = await error.json();
      return data;
    }
  };
}

const initialState = { key: null, token: null, distances: {} };

const mapsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    case LOAD_ACCESS_TOKEN:
      return { ...state, token: action.key };
    case CALCULATE_DISTANCE:
      if (!action.distances) {
        return state;
      }
      newState = { ...state, distances: {} };
      action.distances.forEach(
        (distance) => (newState.distances[distance.location[0]] = distance)
      );
      return newState;
    default:
      return state;
  }
};

export default mapsReducer;
