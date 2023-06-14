import { csrfFetch } from "./csrf";

const LOAD_API_KEY = "maps/LOAD_API_KEY";
const LOAD_ACCESS_TOKEN = "maps/LOAD_ACCESS_TOKEN";
const CALCULATE_DISTANCE = "maps/CALCULATE_DISTANCE";
const CLEAR_DURATIONS = "maps/CLEAR_DURATIONS";

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

const loadAccessToken = (key) => ({
  type: LOAD_ACCESS_TOKEN,
  key,
});

function calculateDistance(durations) {
  return {
    type: CALCULATE_DISTANCE,
    durations,
  };
}

export function clearDurations() {
  return {
    type: CLEAR_DURATIONS,
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
    const { durations } = getState().maps;
    if (durations && Object.keys(durations).length) return;
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
      const durations = await response.json();
      dispatch(calculateDistance(durations.durations));
    } catch (error) {
      const data = await error.json();
      return data;
    }
  };
}

const initialState = { key: null, token: null, durations: [] };

const mapsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    case LOAD_ACCESS_TOKEN:
      return { ...state, token: action.key };
    case CALCULATE_DISTANCE:
      if (!action.durations || action.durations === undefined) {
        return state;
      }

      newState = { ...state, durations: [] };
      // As of right now, I can't think of a reason to normalize the duration to get from point A to B.
      // The distances key won't mean anything in this context. And, given that there could be up to 25 points, the duration might repeat meaning that some items might be replaced.
      // Durations could be null too meaning that a key could be null.
      newState.durations = action.durations.flatMap((duration) => duration);
      return newState;
    case CLEAR_DURATIONS:
      return initialState;
    default:
      return state;
  }
};

export default mapsReducer;
