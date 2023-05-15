import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { getListingsThunk } from '../../store/listings';
import { getUserWishlistsThunk, clearWishlists } from "../../store/wishlists";
import ListingCard from './ListingCard';
import { useCategory } from '../../context/CategoryContext';

export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings.allListings);
    const { error } = useSelector((state) => state.wishlists);
    const { wishListListing } = useSelector((state) => state.wishlists);
    const user = useSelector((state) => state.session.user);

    const {categories, setCategories, sorted, setSorted, selectedCategory, setSelectedCategory} = useCategory();

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
        dispatch(getListingsThunk());
     }, [dispatch]);

    // fetch all categories
    useEffect(() => {
       csrfFetch('/api/categories')
       .then(res => res.json())
       .then(data => setCategories(data))
    },[])

    useEffect(() => {
        if (user) {

            dispatch(getUserWishlistsThunk(user.id));
        }
        return () => {
             dispatch(clearWishlists());
        }
    }, [dispatch, user]);

    //display all categories
    function displayCategories() {
        return categories && categories.map(category => (
            <div key={`categoryId-${category.id}`}>
                <div style={{marginRight:"10px", cursor:"pointer"}} onClick={() => {setSelectedCategory(category.name); setSorted(true)}}>
                    {category.name}
                </div>
            </div>
        ))
    }

    if (!listings) return null

    return(
        <>
            <section>
                {error && error !== "Unauthorized" && (
                    <p style={{color:"red"}}>{error}</p>
                )}
                <div style={{display:"flex"}}>
                    {displayCategories()}
                </div>
            </section>
            <section>
                <div style={{display:"flex", flexWrap: "wrap"}}>
                    {listings && listings.map(listing => (
                        <article key = {`listingId-${listing.id}`} style= {{margin:"15px"}} >
                            <NavLink style={{ textDecoration: 'none'}} to={`/listings/${listing.id}`}>
                                    <ListingCard listing = {listing} wishListListing={wishListListing} />
                            </NavLink>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
