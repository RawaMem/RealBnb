import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserListingsThunk } from "../../store/listings";
import UserListingCard from "./UserListingCard";
import './userProfile.css';

function UserListings() {
    const userListings = useSelector(state => state.listings.allListings);
    const dispatch = useDispatch();

    
    useEffect(() => {
        async function getUserListing() {
            await dispatch(getUserListingsThunk());
        };
        getUserListing();
    }, [dispatch])

    const userListingArr = Object.values(userListings);

    return (
        <div className="user-listing-display-container">
            {userListingArr.map(listing => (
                <div key={listing.id} className="userListingCard-container">
                    <UserListingCard listing={listing} />
                </div>
            ))}
        </div>
    )
};

export default UserListings;

