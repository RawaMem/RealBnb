import { csrfFetch } from "./csrf";

const GET_LISTINGS = "listings/GET_listings";
const GET_SINGLE_LISTING = "listings/GET_SINGLE_LISTING";


const getListingsAction = (listings) => ({
    type: GET_LISTINGS,
    listings
});

const getSingleListingAction = (listing) => ({
    type: GET_SINGLE_LISTING,
    listing
})


export const getListings = () => async dispatch => {
    const response = await csrfFetch('/api/listings');

    if (response.ok) {
        const listings = await response.json();
        dispatch(getListingsAction(listings));
        return listings;
    }
};


export const getSingleListingThunk = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);

    if (response.ok) {
        const listing = await response.json()
        dispatch(getSingleListingAction(listing))
        return listing
    }
}

const initialState = {};
export default function listings(state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_LISTINGS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;
        case GET_SINGLE_LISTING:
            newState = action.listing
            return newState;

        default:
            return state;
    }
}
