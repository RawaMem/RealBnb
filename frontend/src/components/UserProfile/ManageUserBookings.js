import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserBookingsThunk } from "../../store/bookings";
import BookingCard from "./BookingCard";

export default function ManageUserBookings() {
    const userBookingsState = useSelector(state => state.bookings);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUserBookingsThunk());
    }, [dispatch]);

    const userBookings = Object.values(userBookingsState);

    console.log("userBookings", userBookingsState)

    const noTripsContent = () => (
        <div className="no-trips-content-container">
            <h5>No trips booked...yet! </h5>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <Link 
            className="manage-bookings-start-searching-btn-container"
            to="/"
            >
                Start searching
            </Link>
        </div>
    );

    return (
        <div className="user-bookings-display-container">
            {userBookings.length ? userBookings.map(booking => (
                <div key={booking.id}
                className="userBookingCard-container">
                    <BookingCard booking={booking} />
                </div>
            )) : noTripsContent()}
        </div>
    )
};