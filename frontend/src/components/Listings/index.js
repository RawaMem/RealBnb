import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { getListings } from '../../store/listings';
import ListingCard from './ListingCard';


export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings);

    const [categories, setCategories] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    let listings = handleListingsDisplay();

    function handleListingsDisplay() {
        if(listingsObj) {
            let listingsToDispaly = Object.values(listingsObj);
            if(sorted) {
                listingsToDispaly = listingsToDispaly.filter(listObj => {
                    let categoryArr = listObj.Categories;
                    for(let category of categoryArr) {
                        return category.name === selectedCategory;
                    };
                });
            };
            return listingsToDispaly
        };
    };

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
                <div style={{marginRight:"10px", cursor:"pointer"}} onClick={() => {setSelectedCategory(category.name); setSorted(true)}}>                  
                    {category.name}                 
                </div>
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
            <div style={{display:"flex"}}>
                {listings && listings.map(listing => (
                    <div key = {listing.id}>
                        <NavLink style={{ textDecoration: 'none'}} to={`/listings/${listing.id}`}>                     
                                <ListingCard listing = {listing}/>                       
                        </NavLink>
                    </div>
                ))}
            </div>  
        </>
    )
}
