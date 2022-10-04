import { csrfFetch } from "./csrf";

const GET_LISTINGS = "listings/GET_listings";
const GET_SINGLE_LISTING = "listings/GET_SINGLE_LISTING";
const LISTING_SEARCH_RESULTS = "listings/LISTING_SEARCH_RESULTS";
const CLEAR_LISTING_STATE = "listings/CLEAR_LISTING_STATE";
const CREATE_BOOKING = "listings/CREATE_BOOKING";
const DELETE_BOOKING = "listings/DELETE_BOOKING";


const getListingsAction = (listings) => ({
    type: GET_LISTINGS,
    listings
});

const getSingleListingAction = (listing) => ({
    type: GET_SINGLE_LISTING,
    listing
});

const listingSearchResultsAction = (listings) => ({
    type: LISTING_SEARCH_RESULTS,
    listings
});

const createBooking = booking => ({
    type: CREATE_BOOKING,
    booking
});

const deleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
});

export const clearListingStateAction = () => ({
    type: CLEAR_LISTING_STATE
});

export const getListingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/listings');
    if (response.ok) {
        const listings = await response.json();
        dispatch(getListingsAction(listings));
        return listings;
    }
};


export const getListingSearchResultsThunk = (searchFormValues) => async dispatch => {
    let currentUrl;
    if (process.env.NODE_ENV === 'production') {
        currentUrl = 'https://realbnb-app.herokuapp.com/api/listings/search'
    } else {
        currentUrl = 'http://localhost:5000/api/listings/search'
    }
    const urlInstance = new URL(currentUrl)
    for (let key in searchFormValues) {
        urlInstance.searchParams.append(key, searchFormValues[key])
    }
    console.log('THIS IS TEH SEACH URL', urlInstance)
    const response = await csrfFetch(urlInstance);
    if (response.ok) {
        const listings = await response.json();
        dispatch(listingSearchResultsAction(listings));
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
};


export const buildBooking = (booking, listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}/booking`, {
        method: "POST",
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    }
};

export const removeBooking = bookingId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteBooking(bookingId));
    }
};

const initialState = null;
export default function listings(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_LISTINGS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;
        case GET_SINGLE_LISTING:
            newState = { ...state }
            newState.currentListing = action.listing
            return newState;
        case LISTING_SEARCH_RESULTS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;
        case CREATE_BOOKING: {
            return { ...state, currentListing: { ...state.currentListing, Bookings: [...state.currentListing.Bookings, action.booking] } };
        }
        case DELETE_BOOKING: {
            const newState = { ...state, currentListing: { ...state.currentListing, Bookings: [...state.currentListing.Bookings] } };
            const filteredBooks = newState.currentListing.Bookings.filter(booking => booking.id !== +action.bookingId);
            newState.currentListing.Bookings = filteredBooks;
            return newState;
        }
        case CLEAR_LISTING_STATE:
            return null
        default:
            return state;
    }
}
