import { csrfFetch } from './csrf';

const LOAD_API_KEY = 'maps/LOAD_API_KEY';
const LOAD_ACCESS_TOKEN = 'maps/LOAD_ACCESS_TOKEN';

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

const loadAccessToken = key => ({
    type: LOAD_ACCESS_TOKEN,
    key
})


export const getKey = () => async (dispatch) => {
  const res = await csrfFetch('/api/maps/key', {
    method: 'POST',
  });
  const data = await res.json();
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

export const getToken = () => async (dispatch) => {
    const res = await csrfFetch('/api/maps/accessToken', {
        method: 'POST'
    });
    const token = await res.json();
    dispatch(loadAccessToken(token.mapboxAccessToken));
}

const initialState = { key: null, token: null };

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    case LOAD_ACCESS_TOKEN:
        return {...state, token: action.key}
    default:
      return state;
  }
};

export default mapsReducer;