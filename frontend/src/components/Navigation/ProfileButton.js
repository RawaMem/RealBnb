import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { ProfileDropdown } from "../../ui/ProfileDropdown";

function ProfileButton({ isLoaded, setShowLogInModal, setShowSignUpModal}) {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
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
    dispatch(sessionActions.logout());
  };

  let dropDown;
  if (isLoaded && !user) {
    dropDown = (
      <div className="profile-dropdown">
        <ul className="profile-dropdown-ul">
          <li onClick={()=>setShowLogInModal(true)}>Log in</li>
          <li onClick={()=>setShowSignUpModal(true)}>Sign up</li>
        </ul>
      </div>
    )
  } else if(isLoaded && user) {
    dropDown = (
      <div className="profile-dropdown">
        <ul className="profile-dropdown-ul">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <NavLink to="/user-profile">manage listings</NavLink>
          <br />
          <NavLink to="/wishlists">Wishlists</NavLink>
          <li onClick={logout}>Log Out</li>
          <NavLink to={`/user-bookings/${user.id}`}>Trips</NavLink>
        </ul>
      </div>
    )
  };

  return (
    <div className="profileDropDownBtn">
        <ProfileDropdown openMenu={openMenu}/>
        <div className="profileDropDown-container">
          {showMenu && dropDown}
        </div>
    </div>
  );
}

export default ProfileButton;
