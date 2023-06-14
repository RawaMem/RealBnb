import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import listings from './listings';
import mapsReducer from './maps';
import reviews from './reviews';
import dmThreads from './directMessageThreads';
import directMessages from './directMessages';
import bookingsReducer from './bookings';
import wishlistsReducer from "./wishlists.js";

const rootReducer = combineReducers({
  session,
  listings,
  reviews,
  maps: mapsReducer,
  dmThreads,
  directMessages,
  bookings: bookingsReducer,
  wishlists: wishlistsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
