import { useSelector } from "react-redux";
import * as React from 'react';
import { useState } from "react";
import UserListings from "./UserListings";

function UserProfile() {
    const user = useSelector(state => state.session.user);
    const [showComponent, setShowComponent] = useState("View all your listings");

    return (
        <div className="userListingPage-main-container">
            <div className="welcome-container">
                <h3>Welcome back, {user.username}</h3>
            </div>

            <div className="toggle-tab-container-outer">
                <div className="toggle-tab-container-inner">
                    <div onClick={() => setShowComponent("View all your listings")}>View all your listings</div>
                    <div onClick={() => setShowComponent("NEW TAB TO BE USED")}>New tab to be used</div>
                </div>
            </div>

            <div className="content-page-container">
                {showComponent==="View all your listings" &&  <UserListings />}
                {showComponent==="NEW TAB TO BE USED" && <div>To be developed</div>}
            </div>
        </div>
    );
};

export default UserProfile;