import React, { useState, useReducer } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormModal';
import SignupForm from '../SignupFormPage';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import { useCategory } from '../../context/CategoryContext';
import { getListingsThunk } from '../../store/listings';
import DatePicker, {datePickerReducer} from '../../ui/DatePicker';
import { getListingSearchResultsThunk } from '../../store/listings';

function Navigation({ isLoaded }){

  const dispatchThunk = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [destination, setDestination] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSearchDropDown, setShowSearchDropDown] = useState(false);
  const history = useHistory();

  const {setSorted} = useCategory();

  const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  const [state, dispatch] = useReducer(datePickerReducer, initialState);

  function isDateBlocked(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const daySize = [25, 25];

  function convertDateObjToStr(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ')
  };

  function openMenu() {
    if(showSearchDropDown) return;
    setShowSearchDropDown(true);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    let checkIn = "";
    let checkOut = ""
    if(state.startDate) checkIn = convertDateObjToStr(state.startDate);;
    if(state.endDate) checkOut = convertDateObjToStr(state.endDate);
    const searchFormValues = {
      destination,
      checkIn,
      checkOut,
      numGuests
    }
    dispatchThunk(getListingSearchResultsThunk(searchFormValues))
    .then(() => setShowSearchDropDown(false))
    .then(() => history.push("/"))
  };

  let sessionLinks = (
    <ProfileButton
      isLoaded={isLoaded}
      setShowLogInModal={setShowLogInModal}
      setShowSignUpModal={setShowSignUpModal}
    />
  );

  const searchDropdown = (
            <div className='search-form-container'>
                <form className="listingsSearch"
                    onSubmit={handleSearch}>

                    <input
                    type="text"
                    className="search-form-destinations"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder='Search destinations'
                    />

                    <DatePicker 
                    state={state} 
                    dispatch={dispatch} 
                    isDateBlocked={isDateBlocked} 
                    daySize={daySize} />

                    <div className='search-form-numGuests-container'>
                      <div className='search-form-numGuests-label'>
                        Add Guests
                      </div>
                      <div className='search-form-numGuests-calcu-container'>
                        <div 
                        className='search-form-numGuests-plus'
                        onClick={() => setNumGuests(prev => +prev + 1)}
                        >
                          +
                        </div>
                        <input
                        type="number"
                        className="search-form-numGuests-input"
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        id="search-form-numGuests"
                        min="1"
                        />
                        <div
                        className='search-form-numGuests-minus'
                        onClick={() => setNumGuests(prev => {
                          if(prev >= 2) return prev - 1;
                          else return 1
                        })}
                          >
                            -
                        </div>
                      </div>
                    </div>
                    <div className='search-form-button-container'>
                      <button className="search-form-searchBtn">Search</button>
                    </div>
                </form>
            </div>
        
    );

  return (
    <div 
      className='nav-container'
    >
      <div className='nav-inner-container'>
        <div className='logo-container'>
          <NavLink exact to="/" 
          onClick={()=> {
            setSorted(false)
            dispatchThunk(getListingsThunk())}
          } 
          id="logo-text"> RealBnB </NavLink>
        </div>

        <div 
          className='search-bar-container'
          
        >

              <div className='search-bar-content'>Anywhere</div>
              <div className='search-bar-content'>Any week</div>
              <div 
              className='search-bar-search-icon'
              onClick={() => setShowSearchDropDown(prev=> !prev)}
              >
                Search
                  <span 
                    className="material-symbols-outlined"
                    id="material-symbols-search"
                  >
                    search
                  </span>
              </div>
    
                {showSearchDropDown && searchDropdown}
              
        </div>
        <div className='right-section'>
          {/* {sessionUser && <Link to='/messages'>
            <div className="navbar-messages">Messages</div>
          </Link>} */}

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
