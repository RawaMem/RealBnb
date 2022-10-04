import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";




function CreateReview({setShowCreateReviewModal, currentUser}) {
    const [content, setContent] = useState('')
    const [starRating, setStarRating] = useState('')
    const [cleanliness, setCleanliness] = useState('')
    const [communication, setCommunication] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [location, setLocation] = useState('')
    const [value, setValue] = useState('')

    const handleSubmit = async (e) => {
        console.log('create review form handle submit funciton running')
        const dispatch = useDispatch()
        const review = {
            content,
            starRating,
            cleanliness,
            communication,
            checkIn,
            accuracy,
            location,
            value,
            authorId: currentUser.id
        }

        await dispatch(createReviewThunk(review))

        setShowCreateReviewModal(false)

    }


    return(
        <>
            <form
            onSubmit={handleSubmit}
            className="createReviewForm">
                <label>
                    Overall Star Rating
                    <select
                    value={starRating}
                    onChange={(e)=>setStarRating(e.target.value)}
                    className="starRatingDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Cleanliness Rating
                    <select
                    value={cleanliness}
                    onChange={(e)=>setCleanliness(e.target.value)}
                    className="cleanlinessDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Communication Rating
                    <select
                    value={communication}
                    onChange={(e)=>setCommunication(e.target.value)}
                    className="communicationDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    CheckIn Rating
                    <select
                    value={checkIn}
                    onChange={(e)=>setCheckIn(e.target.value)}
                    className="checkInDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Accuracy Rating
                    <select
                    value={accuracy}
                    onChange={(e)=>setAccuracy(e.target.value)}
                    className="accuracyDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Location Rating
                    <select
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                    className="locationDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Value Rating
                    <select
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    className="valueDropDown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    <textarea
                    cols="30"
                    rows="10"
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    className="contentTextArea"></textarea>
                </label>
                <button className="createReviewSubmitBtn">Submit Review</button>
            </form>
            <button
            onClick={()=> setShowCreateReviewModal(false)}
            className="cancelLeaveReviewBtn">Cancel</button>
        </>
    )
}

export default CreateReview
