import { useState } from "react";
import {Link} from "react-router-dom";
import { Modal } from "../../context/Modal";
import ConfirmDeleteBookingForm from "./ConfirmDeleteBookingForm";

export default function BookingCard({booking, showConfirmDeleteModal, showConfirmDeleteForm, setShowConfirmDeleteForm}) {

    // const [showConfirmDeleteForm, setShowConfirmDeleteForm] = useState(false);

    function convertDate(date) {
        const dateObj = new Date(date);

        const year = dateObj.getFullYear(); 
        const month = dateObj.getMonth() + 1; 
        const day = dateObj.getDate();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return formattedDate;
    };

    // function showConfirmDeleteModal() {
    //     return (
    //         <Modal onClick={() => setShowConfirmDeleteForm(false)}>
    //             <ConfirmDeleteBookingForm
    //                 setShowConfirmDeleteForm={setShowConfirmDeleteForm}
    //                 previewImageUrl={booking.listingImagePreview}
    //                 bookingId={booking.id}
    //             />
    //         </Modal>
    //     );
    // };


    return (
        <div className="userListingCard-container">
            <Link
                to={`/listings/${booking.listingId}`}
                style={{textDecoration: "none"}}
                className="userListingCard-clickable-container"
            >
                <div className="userListingCard-image-container">
                    <img src={booking.listingImagePreview}
                    alt="listing image for the booking" className="userListingCard-image"/>
                </div>

                <div className="booking-info-container">
                    <h5>{booking.listingName}</h5>
                    <div>Guest Total: {booking.numOfGuests}</div>
                    <div>Check-In Date: {convertDate(booking.startDate)}</div>
                    <div>Check-Out Date: {convertDate(booking.endDate)}</div>
                    <div>Date of Reservation: {convertDate(booking.createdAt)}</div>
                    <div>Average Rate: $ {booking.avePricePerDay}</div>
                    <div>Total Amount: $ {booking.totalCost}</div>
                </div>
            </Link>

            <div id="edit-delete-btn-container">
                    <div>
                        <span 
                        onClick={() => setShowConfirmDeleteForm(true)}
                        className="material-symbols-outlined">
                            delete
                        </span>
                    </div>
            </div>

            {showConfirmDeleteForm && showConfirmDeleteModal(booking)}
        </div>
    );
};