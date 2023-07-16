import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SingleListingPage from './components/SingleListingPage';
import Listings from './components/Listings';
import TestCompontent from './components/TestComponent';
import AddressForm from './components/CreateListing/AddressForm';
import BedGuestForm from './components/CreateListing/BedGuestForm';
import AmenitiForm from './components/CreateListing/AmenitiForm';
import ImageForm from './components/CreateListing/ImageForm';
import Introducing from './components/CreateListing/Introducing';
import TitleForm from './components/CreateListing/TitleForm';
import DescriptionForm from './components/CreateListing/DescriptionForm';
import ListingPriceForm from './components/CreateListing/ListingPriceForm';
import CategoryForm from './components/CreateListing/CategoryForm';
import UserProfile from './components/UserProfile';
import WishList, { WishListListing } from './components/WishLists';
import EditListingForm from './components/EditListing';
import ManageUserBookings from './components/MangeBooking';
import BookingDetail from './components/MangeBooking/BookingDetail';


//websocket setup
import { io } from 'socket.io-client'
import Socket from './components/Socket';
import Messages from './components/Messages';
import MessageWrapper from './components/Messages/MessageWrapper';
let serverUrl;
if (process.env.NODE_ENV === 'production') {
  serverUrl = 'https://realbnb.onrender.com/'
} else {
  serverUrl = 'http://localhost:5000'
}

// const socket = io(serverUrl, {
//   transports: ['websocket']
// })
// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });
// socket.on("connect", () => {
//   console.log(`socket created in frontend/App.js with socket.id ${socket.id}.`)
// })
//end websocket code

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/wishlists'>
            <WishList />
          </Route>
          <Route exact path='/wishlists/:wishlistId'>
            <WishListListing />
          </Route>
          <Route exact path="/">
            <Listings />
          </Route>
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
          <Route exact path='/user-bookings/:userId'>
            <ManageUserBookings />
          </Route>
          <Route exact path='/user-bookings/detail/:bookingId'>
            <BookingDetail />
          </Route>
          <StyledEngineProvider injectFirst>
            <Route exact path='/edit-listing/:listingId'>
              <EditListingForm />
            </Route>
          </StyledEngineProvider>

          {/* <Route exact path='/messages/'>
            <MessageWrapper socket={socket}/>
          </Route> */}
          <Route exact path='/testing'>
            <TestCompontent />
          </Route>
          <Route exact path="/">
            <Listings />
          </Route>
          {/* <Route exact path='/sockets'>
            <Socket socket={socket} />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
