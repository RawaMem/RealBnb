import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { getListings } from '../../store/listings';
import ListingCard from './ListingCard';

export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings);
    let listings;
    if (listingsObj) listings = Object.values(listingsObj);
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        dispatch(getListings());
     }, [dispatch]);

    // fetch all categories
    useEffect( async() => {
       const response = await csrfFetch('/api/categories');
       if (response.ok) {
        setCategories(await response.json())
        }
    },[])

    // display all categories
    function displayCategories() {
        return categories && categories.map(category => (
            <div key={category.id}>
                <NavLink style={{textDecoration:'none', marginRight:"10px"}} to={'/listings'}>                  
                        {category.name}                 
                </NavLink>
            </div>
        ))
    }

     if (!listings) return null
    
    return(
        <>
            <h4>Welcome to Listings Page!</h4> 
            <div style={{display:"flex"}}>
                {displayCategories()}
            </div>    
            {listings && listings.map(listing => (
                <div key = {listing.id}>
                    <NavLink style={{ textDecoration: 'none'}} to={`/listings/${listing.id}`}>                     
                            <ListingCard listing = {listing}/>                       
                    </NavLink>
                </div>
            ))}
        </>
    )
}
