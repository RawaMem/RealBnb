import {Link} from "react-router-dom";

export default function BookingCard({booking}) {
    return (
        <div className="userBookingCard-inner-container">
            <Link
                to={`/listings/${booking.listingId}`}
                className="user-bookings-clickable-section"
            >
                <div className="user-bookings-listing-image-container">
                    <img src={booking.listingImagePreview}
                    alt="listing image for the booking" />
                </div>

                <div className="booking-info-container">
                    
                </div>
            </Link>
        </div>
    );
};