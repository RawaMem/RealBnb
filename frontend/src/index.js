import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';
import * as wishlistActions from './store/wishlists';
import CategoryProvider from './context/CategoryContext';
import ReceiverIdProvider from './context/ReceiverId';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.wishlistActions = wishlistActions;
}

function Root() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <ModalProvider>
        <Provider store={store}>
          <CategoryProvider>
            <ReceiverIdProvider>
              <BrowserRouter>
                <Switch>
                  <App />
                </Switch>
              </BrowserRouter>
          </ReceiverIdProvider>
        </CategoryProvider>
      </Provider>
    </ModalProvider>
    </GoogleOAuthProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
