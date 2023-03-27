import { csrfFetch } from "./csrf";
import { getReviewsForSingleListingAction } from "./reviews";

const GET_LISTINGS = "listings/GET_listings";
const GET_SINGLE_LISTING = "listings/GET_SINGLE_LISTING";
const LISTING_SEARCH_RESULTS = "listings/LISTING_SEARCH_RESULTS";
const CLEAR_LISTING_STATE = "listings/CLEAR_LISTING_STATE";
const STORE_LISTING_IMAGES_FILES="listings/STORE_LISTING_IMAGES_FILES";

export const getListingImagesAction = multiImagesFilesArr => {
    console.log('from action', multiImagesFilesArr)
    return {type: STORE_LISTING_IMAGES_FILES,
            multiImagesFilesArr}
};

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
        //check if listing has reviews
        //then create new reference in memory and send data to its own state slice
        if (listing.Reviews){
            await dispatch(getReviewsForSingleListingAction([...listing.Reviews]))
            delete listing.Reviews
        }
        dispatch(getSingleListingAction(listing))
        return listing
    }
};

export const createNewListingThunk = (newListing, newListingImages) => async dispatch => {
    const [multiImages, imageDescription] = newListingImages;

    const newListingResponse = await csrfFetch("/api/listings", {
        method: 'POST',
        body: JSON.stringify(newListing)
    });
    // console.log('from thunk newListingResponse', newListingResponse.json())  

    if(newListingResponse.ok) {  
        const newList = await newListingResponse.json();   
        for(let imageFile of multiImages) {
            const formData = new FormData();
            if(imageFile.preview in imageDescription) {
                formData.append('description', imageDescription[imageFile.preview]);
            };
            formData.append('image', imageFile);

            const newImages = await csrfFetch(`/api/listings/${newList.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  body: formData,
            });
        }; 

        return newList;        
    };

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
        case STORE_LISTING_IMAGES_FILES:
            newState=[]
            return [...newState, ...action.multiImagesFilesArr];
        case CLEAR_LISTING_STATE:
            return null
        default:
            return state;
    }
}


        //keep for now, once we know we dont need this then we can delete
        //this was in case get single listing but refactored it to be cleaner
        // newState.currentListing.Reviews = [...action.listing.Reviews]
        // const normalizedReviews = {}
        // if (action.listing.Reviews) {
        //     action.listing.Reviews.forEach(review => {
        //     normalizedReviews[review.id] = review
        //     })
        // }
        // newState.currentListing.Reviews = normalizedReviews

        // case CREATE_REVIEW:
        //     newState = {...state}
        //     newState.currentListing = {...state.currentListing}
        //     if (state.currentListing.Reviews) {
        //         newState.currentListing.Reviews = {...state.currentListing.Reviews}
        //     }
        //     newState.currentListing.Reviews[action.review.id] = action.review
        //     return newState
        // case EDIT_REVIEW:
        //     newState = {...state}
        //     newState.currentListing = {...state.currentListing}
        //     newState.currentListing.Reviews = {...state.currentListing.Reviews}
        //     newState.currentListing.Reviews[action.review.id] = action.review
        //     return newState
        // case DELETE_REVIEW:
        //     newState = {...state}
        //     newState.currentListing = {...state.currentListing}
        //     newState.currentListing.Reviews = {...state.currentListing.Reviews}
        //     delete newState.currentListing.Reviews[action.review.id]
        //     return newState
