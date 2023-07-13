import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { getListingsThunk } from '../../store/listings';
import { getUserWishlistsThunk, clearWishlists, deleteWishlistListingThunk } from "../../store/wishlists";
import ListingCard from './ListingCard';
import { useCategory } from '../../context/CategoryContext';
import { CreateWishListParentComponent } from '../WishLists/CreateParentComponent';
import LoginForm from '../LoginFormModal';
import { Modal } from '../../context/Modal';
import './Listings.css';

export default function Listings() {
    const [showCreateWishListModal, setShowCreateWishListModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const [showLogInModal, setShowLogInModal] = useState(false);

    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings.allListings);
    const { error } = useSelector((state) => state.wishlists);
    const { wishListListing } = useSelector((state) => state.wishlists);
    const user = useSelector((state) => state.session.user);

    const { categories, setCategories, sorted, setSorted, selectedCategory, setSelectedCategory } = useCategory();

    let listings = handleListingsDisplay();

    function handleListingsDisplay() {
        if (listingsObj) {
            let listingsToDispaly = Object.values(listingsObj);
            if (sorted) {
                listingsToDispaly = listingsToDispaly.filter(listObj => {
                    let categoryArr = listObj.Categories;
                    for (let category of categoryArr) {
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
    }, [])

    useEffect(() => {
        if (user) {

            dispatch(getUserWishlistsThunk(user.id));
        }
        // return () => {
        //      dispatch(clearWishlists());
        // }
    }, [dispatch, user]);

    useEffect(() => {
        if (!user) {
            dispatch(clearWishlists());
        }
    }, [dispatch, user]);

    //display all categories
    function displayCategories() {
        return categories && categories.map(category => (
            <div key={`categoryId-${category.id}`}>
                <div style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => { setSelectedCategory(category.name); setSorted(true) }}>
                    {category.name}
                </div>
            </div>
        ))
    }

    if (!listings) return null

    return (
        <>
            <section>
                <div className="listing-categories">
                    {displayCategories()}
                </div>
            </section>
            <section>
                <div className='listings-grid'>
                    {listings && listings.map(listing => (
                        <article key={`listingId-${listing.id}`} className="listing-container">
                            <span onClick={async () => {
                                if (!user) {
                                    setShowLogInModal(listing.id);
                                    return;
                                }
                                if (listing.id in wishListListing) {
                                    console.log("%c wishListListing[listing.id]", "color:pink;", wishListListing[listing.id]);
                                    await dispatch(deleteWishlistListingThunk(wishListListing[listing.id].WishListListing.wishlistId, listing.id));
                                    return;
                                }
                                setShowCreateWishListModal(listing.id);
                                setModalOpen("CreateWishListModal");
                            }} className="material-symbols-outlined heart-icon" style={listing.id in wishListListing ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48", color: "red" } : { color: "gray" }}>favorite</span>
                            {showCreateWishListModal === listing.id && modalOpen === "CreateWishListModal" && <CreateWishListParentComponent setModalOpen={setModalOpen} modalOpen="CreateWishListModal" user={user} listingId={showCreateWishListModal} />}
                            {showLogInModal === listing.id && (
                                <Modal onClose={() => setShowLogInModal(false)}>
                                    <LoginForm setShowLogInModal={setShowLogInModal} />
                                </Modal>
                            )}
                            <ListingCard listing={listing} />
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
