import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReviewFormModal from "../SingleListingPage/ReviewFormModal";

export default function UserReviewCard({review}) {

    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    const [reviewToEdit, setReviewToEdit] = useState({})

    const handleEdit = (review)=>{
        setReviewToEdit(review)
        setShowEditReviewModal(true)
    };

    console.log("showEditReviewModal from UserReviewCard", showEditReviewModal)
    
    return (
        <div className="user-reviews-display-inner-container" >
             <Link 
                    to={`/listings/${review.listingId}`}
                    style={{textDecoration: "none"}}
                    className="user-review-clickable-section"
                >
                <div className="user-review-listing-image-container">
                    <img src={review.listingImageUrl} alt="listing image of the review" className="user-review-image" />
                </div>

                <div className="user-review-info-container">
                    
                    <div className="user-review-listing-name">
                        <h5>
                            {review.listingName}
                        </h5>
                        <div className="user-review-card-rating-container">               
                            <span className="material-icons" style={{fontSize: "22px"}}>
                            star
                            </span>
                            <p>{review.starRating.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="user-review-content-container">
                        {review.content}
                    </div>
                </div>
            </Link>

            <ReviewFormModal 
                setShowCreateReviewModal={setShowEditReviewModal}
                showCreateReviewModal={showEditReviewModal}
                reviewToEdit={reviewToEdit}
                currentUser={currentUser}
                listingId={review.listingId}
                setReviewToEdit={setReviewToEdit}
            />
            <div 
                className="user-review-edit-btn-container"
            >
                <div 
                    className="user-review-edit-pen-container"
                    onClick={() => handleEdit(review)}
                >
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </div>
            </div>

        </div>
    );
};