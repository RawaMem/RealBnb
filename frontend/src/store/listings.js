import { csrfFetch } from "./csrf";
import { getReviewsForSingleListingAction } from "./reviews";

const GET_LISTINGS = "listings/GET_listings";
const GET_SINGLE_LISTING = "listings/GET_SINGLE_LISTING";
const LISTING_SEARCH_RESULTS = "listings/LISTING_SEARCH_RESULTS";
const CLEAR_LISTING_STATE = "listings/CLEAR_LISTING_STATE";
const STORE_LISTING_IMAGES_FILES="listings/STORE_LISTING_IMAGES_FILES";
const GET_USER_LISTINGS = "listings/GET_USER_LISTINGS";
const DELETE_USER_LISTING = "listings/DELETE_USER_LISTING";
const GET_LISTING_INFO_FOR_EDIT = "listings/GET_LISTING_INFO_FOR_EDIT";

export const getListingInfoForEditAction = listing => ({
    type: GET_LISTING_INFO_FOR_EDIT,
    listing
});

export const deleteUserListingAction = listingId => ({
    type: DELETE_USER_LISTING,
    listingId
});

export const getUserListingsAction = listings => ({
    type: GET_USER_LISTINGS,
    listings
});

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

export const getListingInfoForEditThunk = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}/editForm`);
    if(response.ok) {
        const listing = await response.json();
        dispatch(getListingInfoForEditAction(listing));
        return listing;
    };
};

export const getListingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/listings');
    if (response.ok) {
        const listings = await response.json();
        dispatch(getListingsAction(listings));
        return listings;
    }
};

export const getUserListingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/listings/user');

    if(response.ok) {
        const userListings = await response.json();
        dispatch(getUserListingsAction(userListings.userListings));
    };
};

export const deleteUserListingThunk = listingId => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}/delete`, {
        method: "DELETE",
    });

    if(response.ok) dispatch(deleteUserListingAction(listingId));

    return response;
};


export const getListingSearchResultsThunk = (searchFormValues) => async dispatch => {
    let currentUrl;
    if (process.env.NODE_ENV === 'production') {
        currentUrl = 'https://realbnb-app.herokuapp.com/api/listings/search'
    } else {
        currentUrl = 'http://localhost:8000/api/listings/search'
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

export const createNewListingThunk = (newListing, amenityAndCategory, newListingImages) => async dispatch => {
    const [multiImages, imageDescription] = newListingImages;
    const {newListingObj,  listingPricing} = newListing;
    const formData = new FormData();

    for(const info in newListingObj) {
        formData.append(info, newListingObj[info]);
    };

    for(const priceInfo in listingPricing) {
        formData.append(priceInfo, listingPricing[priceInfo]);
    };

    const newListingResponse = await csrfFetch("/api/listings", {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        body: formData,
    });

    if(newListingResponse.ok) {
        const newList = await newListingResponse.json();
        const requests = [];

        for(let imageFile of multiImages) {
            const formData = new FormData();
            if(imageFile.preview in imageDescription) {
                formData.append('description', imageDescription[imageFile.preview]);
            };

            formData.append('image', imageFile);
            requests.push(csrfFetch(`/api/listings/${newList.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  body: formData,
            }));
        };

        try {
            const response = await Promise.all(requests);
        } catch(error) {
            console.log('Error in Promise.all():', error)
            return
        }

        const listingRes = await csrfFetch(`/api/listings/${newList.id}/amenity-category`, {
            method: 'POST',
            body: JSON.stringify(amenityAndCategory)
        }).catch(e => console.error(e))

        if(listingRes) return listingRes
    };
};

const initialState = {allListings:{}, singleListing: {}};
export default function listings(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_LISTINGS:
            newState = {allListings:{}, singleListing: {}};
            action.listings.forEach(listing => newState.allListings[listing.id] = listing);
            return newState;
        case GET_SINGLE_LISTING:
            newState = {allListings:{}, singleListing: {}}
            newState.singleListing = action.listing
            return newState;
        case LISTING_SEARCH_RESULTS:
            newState = {allListings:{}, singleListing: {}};
            action.listings.forEach(listing => newState.allListings[listing.id] = listing);
            return newState;
        case GET_USER_LISTINGS:
            newState = {allListings:{}, singleListing: {}};
            action.listings.forEach(listing => newState.allListings[listing.id] = listing);
            return newState
        case DELETE_USER_LISTING:
            newState={allListings: {...state.allListings}, singleListing: {}};
            delete newState.allListings[action.listingId];
            return newState;
        case GET_LISTING_INFO_FOR_EDIT:
            newState = {allListings:{}, singleListing: {}};
            newState.singleListing = action.listing;
            return newState;
        case CLEAR_LISTING_STATE:
            return {allListings:{}, singleListing: {}}
        default:
            return state;
    };
};

