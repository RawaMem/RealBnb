import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { useState } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numGuests, setNumGuests] = useState('')

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
        />

        <input
        type="date"
        className="checkIn"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        />

        <input
        type="date"
        className="checkOut"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        />

        <input
        type="number"
        className="numGuests"
        value={numGuests}
        onChange={(e) => setNumGuests(e.target.value)}
        />

        <button className="searchBtn">Search</button>
      </form>
      <ul>
        <li>
          <NavLink exact to="/"> Home |</NavLink>
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
