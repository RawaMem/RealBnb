import { Link } from "react-router-dom";
import BookingCard from "./BookingCard";

export default function PastBookings({pastBookings}) {

    const noTripsContent = () => (
        <div className="no-trips-content-container">
            <h5>No past trips booked </h5>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <Link 
            className="manage-bookings-start-searching-btn-container"
            to="/"
            >
                Start searching
            </Link>
        </div>
    );

    if(!pastBookings.length) return noTripsContent();

    return (
        <div className="user-listing-display-container">
            {pastBookings.map(booking => (
                <div key={booking.id} className="userListingCard-container">
                    <BookingCard 
                    booking={booking} 
                    type={"pastBookings"}
                    />
                </div>
            ))}
        </div>
    )
};