import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReview from "./CreateReview";

function ReviewFormModal({currentUser, listingId, showCreateReviewModal, setShowCreateReviewModal, reviewToEdit, showLeaveReviewButton, setReviewToEdit}){
    // const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)

    return(
        <>
            {showCreateReviewModal && (
                <Modal onClose={()=> setShowCreateReviewModal(false)}>
                    <CreateReview
                    currentUser={currentUser}
                    listingId={listingId}
                    reviewToEdit={reviewToEdit}
                    setShowCreateReviewModal={setShowCreateReviewModal}
                    setReviewToEdit={setReviewToEdit}
                    />
                </Modal>
            )}
        </>
    )



}

export default ReviewFormModal;
