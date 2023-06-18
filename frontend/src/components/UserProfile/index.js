import { useSelector } from "react-redux";
import * as React from 'react';
import { useState } from "react";
import UserListings from "./UserListings";
import ManageUserReviews from "./ManageUserReviews";

function UserProfile() {
    const user = useSelector(state => state.session.user);
    const [showComponent, setShowComponent] = useState(localStorage.getItem("user profile current page") || "View your listings");

    return (
        <div className="userListingPage-main-container">
            <div className="welcome-container">
                <h3>Welcome back, {user.username}</h3>
            </div>

            <div className="toggle-tab-container-outer">
                <div className="toggle-tab-container-inner">
                    <div 
                        onClick={() => {
                            localStorage.setItem("user profile current page", "View your listings")
                            setShowComponent("View your listings")
                            }}
                    >
                        View your listings
                    </div>
                    <div 
                    onClick={() => {
                        localStorage.setItem("user profile current page", "Manage your reviews")
                        setShowComponent("Manage your reviews")
                    }}                    
                    >
                        Manage your reviews 
                    </div>
                </div>
            </div>

            <div className="content-page-container">
                {showComponent==="View your listings" &&  <UserListings />}
                {showComponent==="Manage your reviews" && <ManageUserReviews />}               
            </div>
        </div>
    );
};

export default UserProfile;