import { csrfFetch } from "./csrf";
import { getSingleListingThunk } from "./listings";

const GET_SINGLE_LISTING_REVIEWS = 'reviews/GET_SINGLE_LISTING_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS';


export const getReviewsForSingleListingAction = (reviewsArr) =>({
    type: GET_SINGLE_LISTING_REVIEWS,
    reviewsArr
})

const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReviewAction = (id) => ({
    type: DELETE_REVIEW,
    id
})

const getUserReviews = reviews => ({
    type: GET_USER_REVIEWS,
    reviews
});

export const createReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReviewAction(newReview))
    }
}

export const editReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(editReviewAction(newReview))
    }
}

export const deleteReviewThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const response = await res.json()
        if (response.message === 'Review successfully deleted') {
            dispatch(deleteReviewAction(id))
        }
    }
}

export const getUserReviewsThunk = () => async dispatch => {
    const response = await csrfFetch("/api/reviews/userReviews");

    if(response.ok) {
        const reviewData = await response.json();
        dispatch(getUserReviews(reviewData));
    };
};


const initialState = {listingReviews: {}, userReviews: {}};

export default function reviews(state = initialState, action) {
    let newState
    switch(action.type) {
        case GET_SINGLE_LISTING_REVIEWS:
            newState = {...state, listingReviews:{}}
            action.reviewsArr.forEach(review =>{
                newState.listingReviews[review.id] = review
            })
            return newState
        case GET_USER_REVIEWS:
            newState = {...state, userReviews: {}};
            action.reviews.forEach(review => {
                newState.userReviews[review.id] = review
            });
            return newState;
        case CREATE_REVIEW:
            newState = {...state, listingReviews:{...state.listingReviews}};
            newState.listingReviews[action.review.id] = action.review
            return newState
        case EDIT_REVIEW:
            newState = {listingReviews: {...state.listingReviews}, userReviews: {...state.userReviews}};
            newState.listingReviews[action.review.id] = action.review;
            newState.userReviews[action.review.id] = action.review;
            return newState
        case DELETE_REVIEW:
            newState = {listingReviews: {...state.listingReviews}, userReviews: {...state.userReviews}};

            delete newState.listingReviews[action.id]
            delete newState.userReviews[action.id]
            return newState
        default:
            return state
    }
}
