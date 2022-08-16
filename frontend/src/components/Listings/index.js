import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getListings } from '../../store/listings';
import ListingCard from './ListingCard';

export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings);
    let listings;
    if (listingsObj) listings = Object.values(listingsObj);

    useEffect(() => {
        dispatch(getListings());
     }, [dispatch]);

     if (!listings) return null
    
    return(
        <>
            <h4>Welcome to Listings Page!</h4>
            {listings && listings.map(listing => (
                <div key = {listing.id}>
                    <NavLink style={{ textDecoration: 'none'}} to={`/listings/${listing.id}`}>< ListingCard listing = {listing}/></NavLink>
                </div>
            ))}

        </>
    )
}
