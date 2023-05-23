import ProgressBar from 'react-bootstrap/ProgressBar';


import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { useState } from 'react';
import { calculateMonthAndYear, reviewScoreCalculator } from '../Utils';
import ReviewFormModal from './ReviewFormModal';


export default function ReviewsContainer({reviews, currentUser, listingId, listing}) {
    const [reviewToEdit, setReviewToEdit] = useState({})
    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)

    const dispatch = useDispatch()

    let averageScores
    let reviewsArr
    if(reviews) {
        reviewsArr = Object.values(reviews)
        averageScores = reviewScoreCalculator(reviewsArr, currentUser)
    }


    const handleDelete = async (id) => {
        await dispatch(deleteReviewThunk(id))
    }

    const handleEdit = async (review)=>{
        setReviewToEdit(review)
        setShowCreateReviewModal(true)

    }

    if (!averageScores) return (
        <>
            <div className="noReviews">No reviews at this time.</div>
        </>
    )

    return (
        <div className='singleListing-review-container'>
            {listingId &&
            <div className="createReviewBtnContainer">
                        <ReviewFormModal
                        showCreateReviewModal={showCreateReviewModal}
                        setShowCreateReviewModal={setShowCreateReviewModal}
                        reviewToEdit={reviewToEdit}
                        currentUser={currentUser}
                        showLeaveReviewButton={averageScores.showLeaveReviewButton}
                        listingId={listingId}/>
                    </div>
            }

            <div className="aveRatingAndNumReviews">

                <div className="reviewStar-container">
                    <span className="material-icons" id="singleListingReview-font">
                        star
                    </span>
                    <div id="singleListingReview-font">{listing.avgRating !== "NaN" ? listing.avgRating : "New"}</div>
                    <div id="singleListingReview-font">&middot;</div>
                    <div id="singleListingReview-font">{listing.totalNumOfReviews} {listing.totalNumOfReviews === 0 ? "Review" : "Reviews"}</div>
                </div>
                {currentUser && <div
                    className="single-listing-send-message-btn-container" onClick={() => setShowCreateReviewModal(true)}>Leave a Review</div>
                }
            </div>

            {reviewsArr.length <= 0 ? <div>Be the first to leave a review</div> : ( 
            <div className="singleListing-aveRatingBars-container">
                <div className="singleListing-leftRatings-container">
                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Cleanliness</div>
                        <div className="singleListing-progressBar-container" >
                           
                            <div className="progress-bar-item">
                                <ProgressBar now={averageScores.aveCleanliness} max={5} className="custom-progress-bar"/>
                            </div>
                            
                            <div className='singleListing-progresBar-font'>{averageScores.aveCleanliness}</div>
                        </div>
                    </div>

                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Communication</div>                        
                        <div className="singleListing-progressBar-container" >
                            <div className="progress-bar-item">
                                <ProgressBar now={averageScores.aveCommunication} max={5} className="custom-progress-bar"/>
                            </div>
                            <div className='singleListing-progresBar-font'>{averageScores.aveCommunication}</div>
                            </div>
                    </div>

                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Check-in</div>                        
                    
                       
                        <div className="singleListing-progressBar-container" >

                            <div className="progress-bar-item">
                                <ProgressBar now={averageScores.aveCheckIn} max={5} className="custom-progress-bar"/>
                            </div>
                            <div className='singleListing-progresBar-font'>{averageScores.aveCheckIn}</div>
                        </div>
                    </div>
                </div>
                


                <div className="singleListing-rightRatings-container">
                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Accuracy</div>                        
                   
                     
                        <div className="singleListing-progressBar-container" >

                            <div className="progress-bar-item">
                            <ProgressBar now={averageScores.aveAccuracy} max={5} className="custom-progress-bar"/>
                            </div>
                            <div className='singleListing-progresBar-font'>{averageScores.aveAccuracy}</div>
                        </div>
                    </div>
                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Location</div>                                                
                        <div className="singleListing-progressBar-container" >

                        <div className="progress-bar-item">
                            <ProgressBar now={averageScores.aveLocation} max={5} className="custom-progress-bar"/>
                        </div>
                        <div className='singleListing-progresBar-font'>{averageScores.aveLocation}</div>
                        </div>
                    </div>
                    <div className="singleListig-avgRatingBars-single">
                        <div className='singleListing-progresBar-font'>Value</div>                                                
                        <div className="singleListing-progressBar-container" >

                        <div className="progress-bar-item">
                            <ProgressBar now={averageScores.aveValue} max={5} className="custom-progress-bar"/>
                        </div>
                        <div className='singleListing-progresBar-font'>{averageScores.aveValue}</div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            
            

            <div className="listingReviews">
                {reviewsArr.map(review => (
                    <div key={`review-container-id-${review.id}`} className="singleListing-reviewCard-container">
                        <div className='singleListing-review-upper-container'>

                            <div className='singleListing-profile-picture'>
                                {review.User.username.slice(0, 1)}
                            </div>
                            <div>
                                <div className="reviewUserName">{review.User.username}</div>
                                <div className="review-created-time">{calculateMonthAndYear(review.createdAt)}</div>
                            </div>
                        </div>

                        <div className="singleListing-reviewContent-container">
                            <div >{review.content}</div>

                            { currentUser && currentUser.id === review.User.id ?
                            (<>
                            {/* <button
                            onClick={()=>handleDelete(review.id)}
                            className="deleteReviewBtn">Delete Review</button> */}
                            <div 
                            className="single-listing-send-message-btn-container"
                            onClick={()=>handleEdit(review)}
                            >Edit Review</div>
                            </>): null}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )




}
