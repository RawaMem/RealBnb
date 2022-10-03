import { csrfFetch } from "./csrf";

const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReviewAction = (id) => ({
    type: DELETE_REVIEW;
    id
})

export const createReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReviewAction(review))
    }
}

export const editReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(editReviewAction(review))
    }
}

export const deleteReviewThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const newReview = await response.json()
        dispatch(deleteReviewAction(id))
    }
}
