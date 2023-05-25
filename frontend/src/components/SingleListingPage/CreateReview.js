import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk, editReviewThunk } from "../../store/reviews";
import Rating from "../../ui/StarRating/Rating";
import ClearBackgroundBtn from "../../ui/Buttons/ClearBackground";



function CreateReview({setShowCreateReviewModal, currentUser, listingId, reviewToEdit, handleDelete}) {
    console.log("reviewToEdit", reviewToEdit)
    const dispatch = useDispatch()
    const [content, setContent] = useState(reviewToEdit.content ? reviewToEdit.content : '')
    const [starRating, setStarRating] = useState(reviewToEdit.starRating ? reviewToEdit.starRating : 1)
    const [cleanliness, setCleanliness] = useState(reviewToEdit.cleanliness ? reviewToEdit.cleanliness : 1)
    const [communication, setCommunication] = useState(reviewToEdit.communication ? reviewToEdit.communication : 1)
    const [checkIn, setCheckIn] = useState(reviewToEdit.checkIn ? reviewToEdit.checkIn : 1)
    const [accuracy, setAccuracy] = useState(reviewToEdit.accuracy ? reviewToEdit.accuracy : 1)
    const [location, setLocation] = useState(reviewToEdit.location ? reviewToEdit.location : 1)
    const [value, setValue] = useState(reviewToEdit.value ? reviewToEdit.value : 1)
    const [validationErrors, setValidationErrors] = useState([])
    const editeReviewId = reviewToEdit.id || null;

    //  useEffect(()=> {
    //     const errors = []
    //     console.log('this is content.length', content.length)
    //     if (content.length < 2 || content.length >= 200) errors.push('Review must be between 2 and 200 characters.')
    //     if (starRating < 1 || starRating > 5) errors.push('starRating must be between 1 and 5.')
    //     if (cleanliness < 1 || cleanliness > 5) errors.push('Cleanliness must be between 1 and 5.')
    //     if (communication < 1 || communication > 5) errors.push('Communication must be between 1 and 5.')
    //     if (checkIn < 1 || checkIn > 5) errors.push('CheckIn must be between 1 and 5.')
    //     if (accuracy < 1 || accuracy > 5) errors.push('Accuracy must be between 1 and 5.')
    //     if (location < 1 || location > 5) errors.push('Location must be between 1 and 5.')
    //     if (value < 1 || value > 5) errors.push('Value must be between 1 and 5.')
    //     setValidationErrors(errors)
    //  }, [content, starRating, cleanliness, communication, checkIn, accuracy, location, value])

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
        }
        if (reviewToEdit.listingId) {
            review.listingId = reviewToEdit.listingId
            review.id = reviewToEdit.id
        } else {
            review.listingId = listingId
        }

        if (reviewToEdit.listingId) {
            await dispatch(editReviewThunk(review))
        } else {
            await dispatch(createReviewThunk(review))
        }

        setShowCreateReviewModal(false)
    }

    const handleCancel = () => {
        setContent('')
        setStarRating(1)
        setCleanliness(1)
        setCommunication(1)
        setCheckIn(1)
        setAccuracy(1)
        setLocation(1)
        setValue(1)
        setValidationErrors(1)
        setShowCreateReviewModal(false)
    }


    return(
        <div className="review-form-main-container">
            <div className="review-form-title-container"><h3>{reviewToEdit.id ? "Edit Review" : "Create Review"}</h3></div>
            <div className="review-form-content-container">
                <form
                onSubmit={handleSubmit}
                className="review-content-container">
                    <div className="review-star-section">
                        <label>
                            Overall Star Rating
                            {/* <select
                            value={starRating}
                            onChange={(e)=>setStarRating(e.target.value)}
                            className="starRatingDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            Cleanliness Rating
                            {/* <select
                            value={cleanliness}
                            onChange={(e)=>setCleanliness(e.target.value)}
                            className="cleanlinessDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            Communication Rating
                            {/* <select
                            value={communication}
                            onChange={(e)=>setCommunication(e.target.value)}
                            className="communicationDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            CheckIn Rating
                            {/* <select
                            value={checkIn}
                            onChange={(e)=>setCheckIn(e.target.value)}
                            className="checkInDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            Accuracy Rating
                            {/* <select
                            value={accuracy}
                            onChange={(e)=>setAccuracy(e.target.value)}
                            className="accuracyDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            Location Rating
                            {/* <select
                            value={location}
                            onChange={(e)=>setLocation(e.target.value)}
                            className="locationDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                        <label>
                            Value Rating
                            {/* <select
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                            className="valueDropDown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                            <Rating />
                        </label>
                    </div>
                    <div className="review-content-section">
                        <label className="revireForm-contentTextArea-label">
                            <textarea
                            cols="30"
                            rows="10"
                            value={content}
                            onChange={(e)=> setContent(e.target.value)}
                            className="revireForm-contentTextArea"
                            spellcheck="true"
                            ></textarea>
                        </label>
                        <div className="review-form-submit-btn">
                            <div  disabled={validationErrors.length > 0} className="single-listing-send-message-btn-container">
                                {reviewToEdit.listingId ? 'Edit review' : 'Submit Review'}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        
            <div className="cancel-delete-btn-container">
                <div className="cancel-delete-btn-inner-container">
                    <ClearBackgroundBtn btnText={"Cancel"} onClick={handleCancel} />
                    {editeReviewId && 
                    <ClearBackgroundBtn btnText={"Delete"} onClick={handleDelete(editeReviewId)} />
                    }                    
                </div>
            </div>

        </div>
    )
}

export default CreateReview
