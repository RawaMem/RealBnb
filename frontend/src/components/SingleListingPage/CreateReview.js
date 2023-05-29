import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk, editReviewThunk } from "../../store/reviews";
import Rating from "../../ui/StarRating/Rating";
import ClearBackgroundBtn from "../../ui/Buttons/ClearBackground";
import { deleteReviewThunk } from "../../store/reviews";
import { getSingleListingThunk } from "../../store/listings";



function CreateReview({setShowCreateReviewModal, currentUser, listingId, reviewToEdit, setReviewToEdit }) {
    console.log("reviewToEdit", reviewToEdit) 
    const dispatch = useDispatch()
    const [content, setContent] = useState(reviewToEdit.content ? reviewToEdit.content : '')
    const [starRating, setStarRating] = useState(reviewToEdit.starRating ? reviewToEdit.starRating : 0)
    const [cleanliness, setCleanliness] = useState(reviewToEdit.cleanliness ? reviewToEdit.cleanliness : 0)
    const [communication, setCommunication] = useState(reviewToEdit.communication ? reviewToEdit.communication : 0)
    const [checkIn, setCheckIn] = useState(reviewToEdit.checkIn ? reviewToEdit.checkIn : 0)
    const [accuracy, setAccuracy] = useState(reviewToEdit.accuracy ? reviewToEdit.accuracy : 0)
    const [location, setLocation] = useState(reviewToEdit.location ? reviewToEdit.location : 0)
    const [value, setValue] = useState(reviewToEdit.value ? reviewToEdit.value : 0)
    const editeReviewId = reviewToEdit.id || null;

    const handleSubmitBtnDisable = () => !starRating || !cleanliness || !communication || !checkIn || !accuracy || !location || !value || !content.length;

    const handleDelete = (id) => {
        dispatch(deleteReviewThunk(id))
        .then(() => dispatch(getSingleListingThunk(listingId)))
        .then(() => setReviewToEdit({}))
        .then(() => setShowCreateReviewModal(false))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const review = {
            content,
            starRating,
            cleanliness,
            communication,
            checkIn,
            accuracy,
            location,
            value,
            authorId: currentUser.id,
            listingId
        };

        if (reviewToEdit.id) {
            review.id = reviewToEdit.id
        };

        if (reviewToEdit.id) {
            console.log("dispatching edit review", review)
            dispatch(editReviewThunk(review))
            .then(() => dispatch(getSingleListingThunk(listingId)))
        } else {
            console.log("dispatching create review", reviewToEdit)
            dispatch(createReviewThunk(review))
            .then(() => dispatch(getSingleListingThunk(listingId)))
        }

        setReviewToEdit({});
        setShowCreateReviewModal(false);
    };


    return(
        <div className="review-form-main-container">
            <div className="review-form-title-container">
                <h3>{reviewToEdit.id ? "Edit Review" : "Create Review"}</h3>
            </div>
            <hr />

            <div className="review-form-content-container">
                <form
                onSubmit={handleSubmit}
                className="review-content-container">
                    <div className="review-star-section">
                        <div className="review-each-rating-container">
                            <label>
                                Overall Star Rating
                            </label>
                            <Rating rating={starRating} setStarRating={setStarRating} />
                        </div>

                        <div className="review-each-rating-container">

                            <label>
                                Cleanliness Rating
                            </label>
                            <Rating rating={cleanliness} setStarRating={setCleanliness} />
                        </div>
                        <div className="review-each-rating-container">

                            <label>
                                Communication Rating
                            </label>
                            <Rating rating={communication} setStarRating={setCommunication} />
                        </div>
                        <div className="review-each-rating-container">

                            <label>
                                CheckIn Rating
                            </label>
                            <Rating rating={checkIn} setStarRating={setCheckIn} />
                        </div>
                        <div className="review-each-rating-container">

                            <label>
                                Accuracy Rating
                            </label>
                            <Rating rating={accuracy} setStarRating={setAccuracy} />
                        </div>
                        <div className="review-each-rating-container">
                            <label>
                                Location Rating
                            </label>
                            <Rating rating={location} setStarRating={setLocation} />

                        </div>
                        <div className="review-each-rating-container">
                            <label>
                                Value Rating
                            </label>
                            <Rating rating={value} setStarRating={setValue} />
                        </div>
                    </div>
    
                    <div className="review-content-section">
                        <label className="revireForm-contentTextArea-label">
                            <textarea
                            cols="30"
                            rows="10"
                            value={content}
                            onChange={(e)=> setContent(e.target.value)}
                            className="revireForm-contentTextArea"
                            spellCheck="true"
                            ></textarea>
                        </label>
                        <div className="review-form-submit-btn">
                            <button className= {!handleSubmitBtnDisable() ? "single-listing-send-message-btn-container" : "review-form-submit-btn-disabled"}
                            disabled={handleSubmitBtnDisable()}>
                                {reviewToEdit.listingId ? 'Edit review' : 'Submit Review'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            <div className="cancel-delete-btn-container">
                <div className="cancel-delete-btn-inner-container">
                    <ClearBackgroundBtn btnText={"Cancel"} onClick={() => setShowCreateReviewModal(false)} />
                    {editeReviewId && 
                    <ClearBackgroundBtn btnText={"Delete"} onClick={() => handleDelete(editeReviewId)} />
                    }                    
                </div>
            </div>

        </div>
    )
}

export default CreateReview
