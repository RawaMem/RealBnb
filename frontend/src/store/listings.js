import { csrfFetch } from "./csrf";

const GET_LISTINGS = "listings/GET_listings";
const GET_SINGLE_LISTING = "listings/GET_SINGLE_LISTING";
const LISTING_SEARCH_RESULTS = "listings/LISTING_SEARCH_RESULTS";
const CLEAR_LISTING_STATE = "listings/CLEAR_LISTING_STATE";
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


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

export const clearListingStateAction = () => ({
    type: CLEAR_LISTING_STATE
});

export const getListingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/listings');
    if (response.ok) {
        const listings = await response.json();
        dispatch(getListingsAction(listings));
        return listings;
}};


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
    console.log('THIS IS TEH SEACH URL',   urlInstance)
    const response = await csrfFetch(urlInstance);
    if (response.ok) {
        const listings = await response.json();
        dispatch(listingSearchResultsAction(listings));
        return listings;
}};


export const getSingleListingThunk = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    if (response.ok) {
        const listing = await response.json()
        dispatch(getSingleListingAction(listing))
        return listing
}};

const initialState = null;
export default function listings(state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_LISTINGS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;
        case GET_SINGLE_LISTING:
            console.log('this is action reviews array', action.listing.Reviews)
            newState = {...state}
            newState.currentListing = action.listing
            newState.currentListing.Reviews = [...action.listing.Reviews]
            const normalizedReviews = {}
            if (action.listing.Reviews) {
                action.listing.Reviews.forEach(review => {
                normalizedReviews[review.id] = review
                })
            }
            newState.currentListing.Reviews = normalizedReviews
            return newState;
        case LISTING_SEARCH_RESULTS:
            newState = {};
            action.listings.forEach(listing => newState[listing.id] = listing);
            return newState;
        case CLEAR_LISTING_STATE:
            return null
        case CREATE_REVIEW:
            newState = {...state}
            newState.currentListing = {...state.currentListing}
            if (state.currentListing.Reviews) {
                newState.currentListing.Reviews = {...state.currentListing.Reviews}
            }
            newState.currentListing.Reviews[action.review.id] = action.review
            return newState
        case EDIT_REVIEW:
            newState = {...state}
            newState.currentListing = {...state.currentListing}
            newState.currentListing.Reviews = {...state.currentListing.Reviews}
            newState.currentListing.Reviews[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            newState.currentListing = {...state.currentListing}
            newState.currentListing.Reviews = {...state.currentListing.Reviews}
            delete newState.currentListing.Reviews[action.review.id]
            return newState
        default:
            return state;
    }
}
