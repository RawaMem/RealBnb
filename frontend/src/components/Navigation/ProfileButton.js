import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
      <ul className="profile-dropdown">
        <li onClick={()=>setShowLogInModal(true)}>Log in</li>
        <li onClick={()=>setShowSignUpModal(true)}>Sign up</li>
      </ul>
    )
  } else if(isLoaded && user) {
    dropDown = (
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    )
  };

  return (
    <>
      <ProfileDropdown openMenu={openMenu}/>
      {showMenu && dropDown}
    </>
  );
}

export default ProfileButton;
