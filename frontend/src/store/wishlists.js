import { csrfFetch } from "./csrf";

const GET_USER_WISHLISTS = "wishlists/GET_USER_WISHLISTS";
const SET_ERROR = "wishlists/SET_ERROR";
const CLEAR_WISHLISTS = "wishlists/CLEAR_WISHLISTS";
const CREATE_WISHLIST = "wishlists/CREATE_WISHLIST";
const DELETE_WISHLIST = "wishlists/DELETE_WISHLIST";

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

export function clearWishlists() {
    return {
        type: CLEAR_WISHLISTS
    }
}

export function createWishlist(wishlist) {
    return {
        type: CREATE_WISHLIST,
        wishlist
    }
}

export function deleteWishlist(wishlistId) {
    return {
        type: DELETE_WISHLIST,
        wishlistId
    }
}


export function getUserWishlistsThunk(userId) {
    return async function(dispatch, getState) {
        const { wishLists } = getState().wishlists;
        if(wishLists && Object.keys(wishLists).length > 0) return;
        try {
            const response = await csrfFetch(`/api/wishlists/${userId}`);
            if (response.ok) {
                const wishlists = await response.json();
                dispatch(getUserWishlists(wishlists));
            }
        } catch (error) {
            const data = await error.json();
            dispatch(setError(data.errors));
        }
    }
}

export function createWishlistThunk(wishlist, listingId) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch("/api/wishlists/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(wishlist)
            });
            if (response.ok) {
                const data = await response.json();
                data.Listings = [];
                const newResponse = await csrfFetch(`/api/wishlists/${data.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({listingId})
                });
                const newData = await newResponse.json();
                data.Listings.push({id: listingId});
                dispatch(createWishlist(data));
                return data;
            }
        } catch (error) {
            const data = await error.json();
            dispatch(setError(data.errors));
        }
    }
}

export function deleteWishlistThunk(wishlistId) {
    return async function(dispatch) {
        try {
            const response = await csrfFetch(`/api/wishlists/${wishlistId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                dispatch(deleteWishlist(wishlistId));
            }
        } catch (error) {
            const data = await error.json();
            dispatch(setError(data.errors));
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
        case CLEAR_WISHLISTS:
            return initialState;
        case CREATE_WISHLIST:
            newState = {...state, wishLists: {...state.wishLists}, error: null};
            newState.wishLists[action.wishlist.id] = action.wishlist
            return newState;
        case DELETE_WISHLIST:
            newState = {...state, wishLists: {...state.wishLists}, error: null};
            delete newState.wishLists[action.wishlistId];
            return newState;
        default:
            return state;
    }
}