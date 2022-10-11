import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReview from "./CreateReview";

function ReviewFormModal({currentUser, listingId, showCreateReviewModal, setShowCreateReviewModal, reviewToEdit, showLeaveReviewButton}){
    // const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)

    return(
        <>
            {currentUser && showLeaveReviewButton && <button className="createReview" onClick={() => setShowCreateReviewModal(true)}>Leave a Review</button>}
            {showCreateReviewModal && (
                <Modal onClose={()=> setShowCreateReviewModal(false)}>
                    <CreateReview
                    currentUser={currentUser}
                    listingId={listingId}
                    reviewToEdit={reviewToEdit}
                    setShowCreateReviewModal={setShowCreateReviewModal}/>
                </Modal>
            )}



        </>
    )



}

export default ReviewFormModal;
