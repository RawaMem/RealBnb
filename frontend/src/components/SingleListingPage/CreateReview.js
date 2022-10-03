import React, { useState } from "react";




function CreateReview({setShowCreateReviewModal}) {
    const [content, setContent] = useState('')
    const [starRating, setStarRating] = useState('')
    const [cleanliness, setCleanliness] = useState('')
    const [communication, setCommunication] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [location, setLocation] = useState('')
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        console.log('create review form handle submit funciton running')
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
                    onChange={()=>setStarRating(e.target.value)}
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
                    onChange={()=>setCleanliness(e.target.value)}
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
                    onChange={()=>setCommunication(e.target.value)}
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
                    onChange={()=>setCheckIn(e.target.value)}
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
                    onChange={()=>setAccuracy(e.target.value)}
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
                    onChange={()=>setLocation(e.target.value)}
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
                    onChange={()=>setValue(e.target.value)}
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
                    onChange={()=> setContent(e.target.value)}
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
