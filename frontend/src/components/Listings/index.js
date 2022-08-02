import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../store/listings';
import { NavLink } from 'react-router-dom';

export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings);
    const listings = Object.values(listingsObj);

    console.log("listings", listings)

    useEffect(() => {
        dispatch(getListings());
     }, [dispatch]);

     if (!listings) return null

    return(
        <>
            <h4>Welcome to Listings Page!</h4>
            {listings && listings.map(listing => (
                <div key= {listing.id} style={{ display: "flex", flexFlow: "column" }}>
                    <NavLink to={`/listings/${listing.id}`}>{listing.name}</NavLink>
                    <img alt="listing" width="300" height="400" src={listing.previewImageUrl}></img>
                </div>
            ))}

        </>
    )
}
