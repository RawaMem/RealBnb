import { csrfFetch } from "./csrf";

const GET_USER_WISHLISTS = "wishlists/GET_USER_WISHLISTS";
const SET_ERROR = "wishlists/SET_ERROR";

function getUserWishlists(wishlists) {
    return {
        type: GET_USER_WISHLISTS,
        wishlists
    }
}

function setError(error) {
    return {
        type: SET_ERROR,
        error
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
            const data = await error.json();
            dispatch(setError(data.message));
        }
    }
}

const initialState = {wishLists: {}, wishListListing: {}, error: null};
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
        case SET_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}