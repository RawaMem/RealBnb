import React, { useState, useEffect, useRef } from 'react';
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
import GoogleMaps from './components/GoogleMaps';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Marker from './components/Marker';


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

// load google map api js
function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //Google Maps setup
  const searchInput = useRef(null);
  // const [apiKey, setApiKey] = useState('');
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(12); // initial zoom
  // Mt Everest 27.9884033, 86.9169069
  const [center, setCenter] = useState({
    lat: 27.9884033,
    lng: 86.9169069,
  });
  const mapApiJs = 'https://maps.googleapis.com/maps/api/js'

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  // const render = (status) => {
  //   switch (status) {
  //     case Status.SUCCESS: {
  //       return (
  //         <>
  //           <input ref={searchInput} type='text' placeholder='Search Location...' />
  //           <button>Get Current Location</button>
  //           <GoogleMaps center={center} zoom={zoom} onClick={onClick} onIdle={onIdle} style={{ height: '30rem', width: '30rem' }}>
  //             {clicks.map((latLng, i) => (<Marker key={i} position={latLng} />))}
  //           </GoogleMaps>
  //         </>
  //       )
  //     }
  //     case Status.FAILURE: {
  //       return <h2>There was a problem: {Status.FAILURE}</h2>
  //     }
  //     case Status.LOADING: {
  //       return <h2>Please wait while Maps loads</h2>
  //     }
  //   }
  // };

  const initMapScript = (data) => {
    console.log("this is the data from the init script => ", data);
    if (window.google) {
      return Promise.resolve()
    }
    const src = `${mapApiJs}?key=${data}&libraries=places`;
    console.log("this is the src => ", src)
    return loadAsyncScript(src)
  };

  const initAutocomplete = () => {
    console.log(searchInput)
    if (!searchInput.current) return;

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current, options);
    autocomplete.setFields(["place_id", "geometry", "name"]);
  };

  const onChangeAddress = (autocomplete) => {
    const location = autocomplete.getPlace();
    console.log('location', location);
  };

  // end of setup

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    fetch('/api/maps-key')
      .then(res => res.json())
      .then(data => initMapScript(data))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchInput.current) return;
    initAutocomplete();
  }, [searchInput.current])

  console.log('searchINput', searchInput);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
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
          <Route path='/maps'>
            <>
              <input ref={searchInput} type='text' placeholder='Search Location...' />
              <button>Get Current Location</button>
              <GoogleMaps center={center} zoom={zoom} onClick={onClick} onIdle={onIdle} style={{ height: '30rem', width: '30rem' }}>
                {clicks.map((latLng, i) => (<Marker key={i} position={latLng} />))}
              </GoogleMaps>
            </>
          </Route>
          <Route path='/sockets'>
            <Socket socket={socket} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
