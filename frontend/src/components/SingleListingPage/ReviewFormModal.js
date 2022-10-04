import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReview from "./CreateReview";

function ReviewFormModal({currentUser, listingId}){
    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)

    return(
        <>
            <button className="createReview" onClick={() => setShowCreateReviewModal(true)}>Leave a Review</button>
            {showCreateReviewModal && (
                <Modal onClose={()=> setShowCreateReviewModal(false)}>
                    <CreateReview
                    currentUser={currentUser}
                    listingId={listingId}
                    setShowCreateReviewModal={setShowCreateReviewModal}/>
                </Modal>
            )}



        </>
    )



}

export default ReviewFormModal;
