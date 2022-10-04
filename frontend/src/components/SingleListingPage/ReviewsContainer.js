import ProgressBar from 'react-bootstrap/ProgressBar';


import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { useState } from 'react';
import { calculateMonthAndYear, reviewScoreCalculator } from '../Utils';


export default function ReviewsContainer({reviews, currentUser, showCreateReviewModal, setShowCreateReviewModal}) {
    const [reviewToEdit, setReviewToEdit] = useState({})
    const dispatch = useDispatch()
    
    let averageScores
    let reviewsArr
    if(reviews) {
        reviewsArr = Object.values(reviews)
        averageScores = reviewScoreCalculator(reviewsArr)
    // console.log('HERE IS AVERAGE SCORES', averageScores)
    }


    const handleDelete = async (id) => {
        await dispatch(deleteReviewThunk(id))
    }

    const handleEdit = async (review)=>{

    }

    if (!averageScores) return (
        <>
            <div className="noReviews">No reviews at this time.</div>
        </>
    )

    return (
        <>
        <div className="aveRatingAndNumReviews">
            <p className="aveReviewText">Star goes here, {averageScores.aveRating}, {reviewsArr.length} reviews</p>
            <div className="aveRatingBars">
                <div className="leftRatings">
                    <div className="aveCleanliness">
                        Cleanliness
                        <ProgressBar now={averageScores.aveCleanliness} max={5}/>
                        {averageScores.aveCleanliness}
                    </div>
                    <div className="aveCommunication">
                        Communication
                        <ProgressBar now={averageScores.aveCommunication} max={5}/>
                        {averageScores.aveCommunication}
                    </div>
                    <div className="aveCheckin">
                        Check-in
                        <ProgressBar now={averageScores.aveCheckIn} max={5}/>
                        {averageScores.aveCheckIn}
                    </div>
                </div>
                <div className="rightRatings">
                    <div className="aveAccuracy">
                        Accuracy
                        <ProgressBar now={averageScores.aveAccuracy} max={5}/>
                        {averageScores.aveAccuracy}
                    </div>
                    <div className="aveLocation">
                        Location
                        <ProgressBar now={averageScores.aveLocation} max={5}/>
                        {averageScores.aveLocation}
                    </div>
                    <div className="aveValue">
                        Value
                        <ProgressBar now={averageScores.aveValue} max={5}/>
                        {averageScores.aveValue}
                    </div>
                </div>
            </div>
        </div>
        <div className="listingReviews">
            {reviewsArr.map(review => (
                <div key={`review-container-id-${review.id}`} className="reviewCard">
                    <div className="reviewUserName">{review.User.username}</div>
                    <div className="reviewUserName">{calculateMonthAndYear(review.createdAt)}</div>
                    <div className="reviewContent">{review.content}</div>
                    {currentUser.id === review.authorId ?
                    (<>
                    <button
                    onClick={()=>handleDelete(review.id)}
                    className="deleteReviewBtn">Delete Review</button>
                    <button
                    onClick={()=>handlEdit(review)}
                    className="editReviewBtn">Edit Review</button>
                    </>): null}
                </div>
            ))}
        </div>

        </>
    )




}
