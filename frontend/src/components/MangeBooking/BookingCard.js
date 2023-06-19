import { Link } from "react-router-dom";


export default function BookingCard({booking, showConfirmDeleteModal, showConfirmDeleteForm, setShowConfirmDeleteForm}) {


    function convertDate(date) {
        const dateObj = new Date(date);

        const year = dateObj.getFullYear(); 
        const month = dateObj.getMonth() + 1; 
        const day = dateObj.getDate();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return formattedDate;
    };

    return (
        <div className="userListingCard-container">
            <Link
                to={`/user-bookings/detail/${booking.id}`}
                style={{textDecoration: "none"}}
                className="userListingCard-clickable-container"
            >
                <div className="userListingCard-image-container">
                    <img src={booking.listingImagePreview}
                    alt="listing image for the booking" className="userListingCard-image"/>
                </div>

                <div className="booking-info-container">
                    <h5>{booking.listingName}</h5>
                    <div>Date of Reservation: {convertDate(booking.createdAt)}</div>
                </div>
            </Link>

            <div id="edit-delete-btn-container">                 
                <span 
                onClick={() => setShowConfirmDeleteForm(true)}
                className="material-symbols-outlined">
                    delete
                </span>                  
            </div>

            {showConfirmDeleteForm && showConfirmDeleteModal(booking)}
        </div>
    );
};