import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { useState } from 'react';
import { getListingSearchResultsThunk } from '../../store/listings';
import { useCategory } from '../../context/CategoryContext';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numGuests, setNumGuests] = useState('')
  const {setSorted} = useCategory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const searchFormValues = {
      destination,
      checkIn,
      checkOut,
      numGuests
    }
    dispatch(getListingSearchResultsThunk(searchFormValues))
  }

  return (
    <>
      <form className="listingsSearch"
        onSubmit={handleSearch}>

        <input
        type="text"
        className="destinations"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder='Search destinations'
        />

        <input
        type="date"
        className="checkIn"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        placeholder='Check in'
        />

        <input
        type="date"
        className="checkOut"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        placeholder='Check out'
        />

        <input
        type="number"
        className="numGuests"
        value={numGuests}
        onChange={(e) => setNumGuests(e.target.value)}
        placeholder='Add Guests'
        />

        <button className="searchBtn">Search</button>
      </form>
      <section>
        <NavLink style={{ textDecoration: 'none', color: "#323232"}} exact to='/createListing'>Become a Host</NavLink>
      </section>
      <ul>
        <li>
          <NavLink exact to="/" onClick={()=> setSorted(false)}> Home |</NavLink>
          <NavLink exact to="/maps"> Maps |</NavLink>
          <NavLink exact to="/sockets"> Sockets |</NavLink>
          <NavLink exact to="/testing">AWS |</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </>

  );
}

export default Navigation;
