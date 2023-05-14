import { csrfFetch } from "./csrf";

const GET_USER_WISHLISTS = "wishlists/GET_USER_WISHLISTS";

function getUserWishlists(wishlists) {
    return {
        type: GET_USER_WISHLISTS,
        wishlists
    }
}

export function getUserWishlistsThunk(userId) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch(`/api/wishlists/${userId}`);
            if (response.ok) {
                const wishlists = await response.json();
                dispatch(getUserWishlists(wishlists));
            }
        } catch (error) {
            const data = await error.json()
        }
    }
}

const initialState = {wishLists: {}, wishListListing: {}};
export default function wishlistsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_WISHLISTS:
            const arrayOfListings = [];
            newState = {...state, wishLists: {}, wishListListing: {}};
            action.wishlists.forEach((wishlist) => {
                newState.wishLists[wishlist.id] = wishlist;
                arrayOfListings.push(wishlist.Listings);
            });
            const formattedListings = arrayOfListings.flatMap((listings) => listings);
            formattedListings.forEach((listing) => {
                newState.wishListListing[listing.id] = listing;
            });
            return newState;
        default:
            return state;
    }
}