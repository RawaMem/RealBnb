import { useState } from "react";
import BookingCard from "./BookingCard";
import { Modal } from "../../context/Modal";
import ConfirmDeleteBookingForm from "./ConfirmDeleteBookingForm";

export default function UpcomingBookings({upcomingBookings}) {

    const [showConfirmDeleteForm, setShowConfirmDeleteForm] = useState(false);
    
    function showConfirmDeleteModal(booking) {
        return (
            <Modal onClick={() => setShowConfirmDeleteForm(false)}>
                <ConfirmDeleteBookingForm
                    setShowConfirmDeleteForm={setShowConfirmDeleteForm}
                    previewImageUrl={booking.listingImagePreview}
                    bookingId={booking.id}
                />
            </Modal>
        );
    };

    return(
        <div className="user-listing-display-container">
            {upcomingBookings.map(booking => (
                <div key={booking.id} className="userListingCard-container">
                    <BookingCard 
                    booking={booking} 
                    showConfirmDeleteModal={showConfirmDeleteModal} showConfirmDeleteForm={showConfirmDeleteForm} 
                    setShowConfirmDeleteForm={setShowConfirmDeleteForm}
                    type={"UpcomingBookings"}
                    />
                </div>
            ))}
        </div>
    )
};