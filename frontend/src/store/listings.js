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
const GET_LISTING_FOR_WISHLISTS = "listings/GET_LISTING_FOR_WISHLISTS";
const EDIT_LISTING = "listing/EDIT_LISTING";
const REMOVE_CATEGORY_AMENITY = "listing/REMOVE_CATEGORY_AMENITY";

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

function getSingleListingForWishListsAction(listing) {
    return {
        type: GET_LISTING_FOR_WISHLISTS,
        listing
    }
}

const listingSearchResultsAction = (listings) => ({
    type: LISTING_SEARCH_RESULTS,
    listings
});

export const clearListingStateAction = () => ({
    type: CLEAR_LISTING_STATE
});


export const editListingThunk = (editedContent, listingId) => async dispatch =>{
    const response = await csrfFetch(`/api/listings/${listingId}/edit`, {
        method: "PATCH",
        body: JSON.stringify(editedContent)
    });

    if(response.ok) {
        const newEditedListing = await response.json();
        return newEditedListing;
    };
};

export const removeCategoryAmenityThunk = (removedCategoryId, removedAmenityId) => async dispatch => {
    try {
        await Promise.all(removedCategoryId.map(categoryId => (
            csrfFetch(`/api/listings/${categoryId}/delete`, {
                method: "DELETE"
            })
        )))
    } catch (error) {
        return error
    }

    try {
        await Promise.all(removedAmenityId.map(amenityId => (
            csrfFetch(`/api/listings/${amenityId}/delete`, {
                method: "DELETE"
            })
        )));
    } catch (error) {
        return error;
    }
};

export const deleteListingImageByIdThunk = (removedImageIds) => async dispatch => {
    try {
        await Promise.all(removedImageIds.map(imageId => (
            csrfFetch(`/api/listings/listingImage/delete/${imageId}`, {
                method: "DELETE"
            })
        )));
    } catch(error) {
        return error
    };
};

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
        currentUrl = 'https://realbnb.onrender.com/api/listings/search'
    } else {
        currentUrl = 'http://localhost:5000/api/listings/search'
    }
    const urlInstance = new URL(currentUrl)
    for (let key in searchFormValues) {
        urlInstance.searchParams.append(key, searchFormValues[key])
    }

    const response = await csrfFetch(urlInstance);
    if (response.ok) {
        const listings = await response.json();
        dispatch(listingSearchResultsAction(listings));
        return listings;
    }
};


export const getSingleListingThunk = (listingId, event="Listing") => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    if (response.ok) {
        const listing = await response.json()
        //check if listing has reviews
        //then create new reference in memory and send data to its own state slice
        if (listing.Reviews){
            await dispatch(getReviewsForSingleListingAction([...listing.Reviews]))
            delete listing.Reviews
        }
        if (event === "Listing") {
            dispatch(getSingleListingAction(listing))
        } else if (event === "WishList") {
            dispatch(getSingleListingForWishListsAction(listing))
        }
        return listing
    }
};

export const editListImagePreviewStatusThunk = (imageId, preview) => async dispatch => {

    const response = await csrfFetch(`/api/listings/edit/${imageId}`, {
        method: "PATCH",
        body: JSON.stringify({preview: preview})        
    });
}

export const createListingImagesThunk = (listingId, newListingImages) => async dispatch => {
    const requests = [];
    const [ImageArr, imageDescription] = newListingImages;

    for(let imageFile of ImageArr) {
        const formData = new FormData();
        const {file, preview} = imageFile;
        if(file.preview in imageDescription) {
            formData.append('description', imageDescription[imageFile.preview]);
        };

        formData.append('image', file);
        formData.append("preview", preview);
        
        requests.push(csrfFetch(`/api/listings/${listingId}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
              },
              body: formData,
        }));
    };

    try {
        await Promise.all(requests);
        return listingId;
    } catch(error) {
        return
    };
};

export const createCategoriesAmenitiesThunk = (amenityAndCategory, listingId) => async dispatch => {
    await csrfFetch(`/api/listings/${listingId}/amenity-category`, {
        method: 'POST',
        body: JSON.stringify(amenityAndCategory)
    }).catch(e => console.error(e))
};

export const createNewListingThunk = (newListing, amenityAndCategory, newListingImages) => async dispatch => {
    const {newListingObj,  listingPricing} = newListing;

    const newListingResponse = await csrfFetch("/api/listings", {
        method: 'POST',
        body: JSON.stringify({...newListingObj, ...listingPricing}),
    });

    if(newListingResponse.ok) {

        const newList = await newListingResponse.json();

        await dispatch(createCategoriesAmenitiesThunk(amenityAndCategory, newList.id));
        const imageRes = await dispatch(createListingImagesThunk(newList.id, newListingImages))

        if(imageRes) return newList;       
    };
};

const initialState = {allListings:{}, singleListing: {}, singleListingForWishLists: {}};
export default function listings(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_LISTINGS:
            newState = {allListings:{}, singleListing: {}};
            action.listings.forEach(listing => newState.allListings[listing.id] = listing);
            return newState;
        case GET_SINGLE_LISTING:
            newState = {allListings:{...state.allListings}, singleListing: {}, singleListingForWishLists: {}}
            newState.singleListing = action.listing
            return newState;
        case GET_LISTING_FOR_WISHLISTS: 
            newState = {allListings:{...state.allListings}, singleListing: {...state.singleListing}, singleListingForWishLists: {}}
            newState.singleListingForWishLists = action.listing
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

