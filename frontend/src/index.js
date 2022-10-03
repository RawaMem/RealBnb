import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';
import { buildBooking } from './store/listings';
import CategoryProvider from './context/CategoryContext';
import ListingProvider from './context/ListingContext';
import CreateListing from './components/CreateListing';

const store = configureStore();


if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.buildBooking = buildBooking;
}

// const Carrot = () => (
//   <div style={{ color: "orange", fontSize: "100px" }}>
//     <i className="fas fa-carrot"></i>
//   </div>
// );

function Root() {
  return (
    <ModalProvider>
        <Provider store={store}>
          <ListingProvider>
          <CategoryProvider>
          <BrowserRouter>
          <Switch>
            <App />
          </Switch>
          </BrowserRouter>
        </CategoryProvider>
        </ListingProvider>
        </Provider>
      </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
