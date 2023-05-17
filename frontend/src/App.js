import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SingleListingPage from './components/SingleListingPage';
import Listings from './components/Listings';
import TestCompontent from './components/TestComponent';
import GoogleMaps from './components/GoogleMaps';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Marker from './components/Marker';
import AddressForm from './components/CreateListing/AddressForm';
import BedGuestForm from './components/CreateListing/BedGuestForm';
import AmenitiForm from './components/CreateListing/AmenitiForm';
import ImageForm from './components/CreateListing/ImageForm';
import Introducing from './components/CreateListing/Introducing';
import TitleForm from './components/CreateListing/TitleForm';
import DescriptionForm from './components/CreateListing/DescriptionForm';
import ListingPriceForm from './components/CreateListing/ListingPriceForm';
import CategoryForm from './components/CreateListing/CategoryForm';
import CreateNewList from './components/CreateListing';
import UserProfile from './components/UserProfile';
import WishList from './components/WishLists';
import { WishListListing } from './components/WishLists';

//websocket setup
import { io } from 'socket.io-client'
import Socket from './components/Socket';
import Messages from './components/Messages';
import MessageWrapper from './components/Messages/MessageWrapper';
let serverUrl;
if (process.env.NODE_ENV === 'production') {
  serverUrl = 'https://realbnb.onrender.com/'
} else {
  serverUrl = 'http://localhost:8000'
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
// function loadAsyncScript(src) {
//   return new Promise(resolve => {
//     const script = document.createElement('script');
//     Object.assign(script, {
//       type: 'text/javascript',
//       async: true,
//       src
//     });
//     script.addEventListener('load', () => resolve(script));
//     document.head.appendChild(script);
//   });
// }

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //Google Maps setup
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

  // const onIdle = (m) => {
  //   console.log("onIdle");
  //   setZoom(m.getZoom());
  //   setCenter(m.getCenter().toJSON());
  // };

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

  // const initMapScript = (data) => {
  //   if (window.google) {
  //     return Promise.resolve()
  //   }
  //   const src = `${mapApiJs}?key=${data}&libraries=places`;
  //   return loadAsyncScript(src)
  // };

  // end of setup

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/createListing/introduction'>
              <Introducing />
          </Route>
          <Route exact path='/createListing/create-address'>
            <AddressForm />
          </Route>
          <Route exact path='/createListing-bedGuestForm'>
              <BedGuestForm />
          </Route>
          <Route exact path='/createListing-amenitiForm'>
            <AmenitiForm />
          </Route>
          <Route exact path='/createListing-categoryForm'>
            <CategoryForm />
          </Route>
          <Route exact path='/createListing/titleForm'>
            <TitleForm />
          </Route>
          <Route exact path='/createListing/descriptionForm'>
            <DescriptionForm />
          </Route>
          <Route exact path='/createListing/listingPriceForm'>
            <ListingPriceForm />
          </Route>
          <Route exact path='/createListing/images'>
            <ImageForm />
          </Route>
          <Route exact path='/listings/:listingId'>
            <SingleListingPage />
          </Route>
          <Route exact path='/user-profile'>
            <UserProfile />
          </Route>
          <Route exact path='/messages/'>
            <MessageWrapper socket={socket}/>
          </Route>
          <Route exact path='/testing'>
            <TestCompontent />
          </Route>
          <Route exact path='/wishlists'>
            <WishList />
          </Route>
          <Route exact path='/wishlists/:wishlistId'>
            <WishListListing />
          </Route>
          <Route exact path="/">
            <Listings />
          </Route>
          <Route exact path='/sockets'>
            <Socket socket={socket} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
