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
import CategoryProvider from './context/CategoryContext';
import CreateListing from './components/CreateListing';

const store = configureStore();


if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
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
          <CategoryProvider>
          <BrowserRouter>
          <Switch>
            <Route exact path='/createListing'>
              <CreateListing />
            </Route>
            <App />
          </Switch>
            {/* <Carrot /> */}
          </BrowserRouter>
        </CategoryProvider>
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
