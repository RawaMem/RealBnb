import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { ProfileDropdown } from "../../ui/ProfileDropdown";
import "./Navigation.css";

function ProfileButton({ isLoaded, setShowLogInModal, setShowSignUpModal}) {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    .then(() => history.push("/"));
  };

  let dropDown;
  if (isLoaded && !user) {
    dropDown = (
      <div className="profile-dropdown-no-auth-container">
          <div 
            onClick={()=>setShowLogInModal(true)}
            className="login-link"
          >Log in</div>
          <div 
          className="signup-link"
          onClick={()=>setShowSignUpModal(true)}>Sign up</div>
      </div>
    )
  } else if(isLoaded && user) {
    dropDown = (
      <div className="profile-dropdown-auth">
          <div className="profile-dropdown-user-info">
            <div className="profile-dropdown-username">Hello, {user.username}</div>
            <div className="profile-dropdown-email">{user.email}</div>
          </div>

          <div className="profile-dropdown-selections">
            <NavLink 
            to="/user-profile" className="profile-dropdown-selections-links">manage listings</NavLink>
            <NavLink 
            to="/wishlists"
            className="profile-dropdown-selections-links"
            >Wishlists</NavLink>
            <NavLink 
            to={`/user-bookings/${user.id}`}
            className="profile-dropdown-selections-links"
            >Trips</NavLink>
          </div>

          <div 
            onClick={logout}
            className="logout-button-container"
          >
            <div 
            className="logout-button"
            >
              Log Out
            </div>
          </div>       
      </div>
    )
  };

  return (
    <div className="profileDropDownBtn">
        <ProfileDropdown openMenu={openMenu}/>
        <div className={user ? "profileDropDown-container" : "profileDropDown-container-no-user"}>
          {showMenu && dropDown}
        </div>
    </div>
  );
}

export default ProfileButton;
