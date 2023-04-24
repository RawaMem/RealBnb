import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormModal';
import SignupForm from '../SignupFormPage';
import './Navigation.css';
import { getListingSearchResultsThunk } from '../../store/listings';
import { Modal } from '../../context/Modal';
import { useCategory } from '../../context/CategoryContext';

function Navigation({ isLoaded }){

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numGuests, setNumGuests] = useState('')

  const {setSorted} = useCategory();

  let sessionLinks = (
    <ProfileButton
      isLoaded={isLoaded}
      setShowLogInModal={setShowLogInModal}
      setShowSignUpModal={setShowSignUpModal}
    />
  );

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
    <div className='nav-container'>
      <div className='nav-inner-container'>
        <div className='logo-container'>
          <NavLink exact to="/" onClick={()=> setSorted(false)} id="logo-text"> RealBnB </NavLink>
        </div>

        <div className='search-bar-container'>
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

        </div>

        <div className='right-section'>
          {sessionUser && <Link to='/messages'>
            <div className="navbar-messages">Messages</div>
          </Link>}

          <div className='become-host-btn-container'>
            {sessionUser && <NavLink id="become-host-link-id" to='/createListing/introduction'>Become a Host</NavLink>}
          </div>
          <div>
            {isLoaded && sessionLinks}
          </div>
        </div>

          {showLogInModal && (
          <Modal onClose={() => setShowLogInModal(false)}>
            <LoginForm setShowLogInModal={setShowLogInModal} />
          </Modal>
          )}
          {showSignUpModal && (
          <Modal onClose={() => setShowSignUpModal(false)}>
            <SignupForm setShowSignUpModal={setShowSignUpModal} />
          </Modal>
          )}

      </div>
    </div>

  );
}

export default Navigation;
