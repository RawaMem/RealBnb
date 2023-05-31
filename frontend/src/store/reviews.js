import { csrfFetch } from "./csrf";

const GET_REVIEWS_FOR_SINGLE_LISTING = 'reviews/GET_REVIEWS_FOR_SINGLE_LISTING';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS';


export const getReviewsForSingleListingAction = (reviewsArr) =>({
    type: GET_REVIEWS_FOR_SINGLE_LISTING,
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

const getUserReviewsAction = (reviews) => ({
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
        console.log('this is the response review in the thunk:',newReview)
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
        dispatch(getUserReviewsAction(reviewData));
    };
};


const initialState = {}
export default function reviews(state = initialState, action) {
    let newState
    switch(action.type) {
        case GET_REVIEWS_FOR_SINGLE_LISTING:
            newState = {}
            action.reviewsArr.forEach(review =>{
                newState[review.id] = review
            })
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case EDIT_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState
        case GET_USER_REVIEWS:
            newState = {};
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        default:
            return state
    }
}
