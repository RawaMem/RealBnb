import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import SingleListingPage from './components/SingleListingPage';
import Listings from './components/Listings';
import TestCompontent from './components/TestComponent';


//websocket setup
import { io } from 'socket.io-client'
import Socket from './components/Socket';
let serverUrl;
if (process.env.NODE_ENV === 'production') {
  serverUrl = 'https://realbnb-app.herokuapp.com'
} else {
  serverUrl = 'http://localhost:5000'
}

const socket = io(serverUrl, {
  transports: ['websocket']
})
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
socket.on("connect", () => {
  console.log(`socket created in frontend/App.js with socket.id ${socket.id}.`)
})
//end websocket code
// let socket;




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // socket = io();

    // socket.on('connect', () => {
    //   console.log("TESTING")
    // });
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));

    // return () => socket.disconnect();

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
      {isLoaded && <Socket socket={socket}/>}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/listings/:listingId'>
            <SingleListingPage />
          </Route>
          <Route path="/listings">
            <Listings />
          </Route>
          <Route path='/testing'>
            <TestCompontent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
