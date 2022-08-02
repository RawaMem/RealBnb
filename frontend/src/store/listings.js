import { csrfFetch } from "./csrf";

const GET_LISTINGS = "listings/GET_listings";

const getListingsAction = (listings) => ({
    type: GET_LISTINGS,
    listings
});

export const getListings = () => async dispatch => {
    const response = await csrfFetch('/api/listings');

    if (response.ok) {
        const listings = await response.json();
        dispatch(getListingsAction(listings));
        return listings;
    }
};

const initialState = {};
export default function listings(state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_LISTINGS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;

        default:
            return state;
    }
}
