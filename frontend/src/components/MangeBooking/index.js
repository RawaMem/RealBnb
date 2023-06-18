import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserBookingsThunk } from "../../store/bookings";
import UpcomingBookings from "./UpcomingBookings";
import PastBookings from "./PastBookings";


export default function ManageUserBookings() {
    const userBookingsState = useSelector(state => state.bookings);
    const dispatch = useDispatch();
    const [showComponent, setShowComponent] = useState("upcomingTrips")
    const upcomingBookings = [];
    const pastBookings = [];
    
    useEffect(() => {
        dispatch(getUserBookingsThunk());
    }, [dispatch]);

    const userBookings = Object.values(userBookingsState);

    console.log("userBookings", userBookingsState)
    userBookings.forEach(booking => {
        const today = new Date();
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        // if the trip already started but not ended
        if(startDate <= today && today <= endDate) upcomingBookings.push(booking);
        
        // if the trip is in the future.
        if(today <= startDate) upcomingBookings.push(booking);

        // if the trip is in the past.
        if(today >= endDate) pastBookings.push(booking);
    });


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
    
    if(!userBookings.length) return noTripsContent();
    return (
        <div className="user-bookings-display-container">

            <div>
                <h2>Trips</h2>
            </div>
            
            <div className="toggle-tab-container-outer">
                <div className="toggle-tab-container-inner">
                    <div 
                        onClick={() => {
                            setShowComponent("upcomingTrips")
                            }}
                    >
                        Upcoming
                    </div>
                    <div 
                    onClick={() => {
                        setShowComponent("pastTrips")
                    }}                    
                    >
                        Past 
                    </div>
                </div>
            </div>

            <div className="content-page-container">
                {showComponent==="upcomingTrips" &&  <UpcomingBookings upcomingBookings={upcomingBookings} />}
                {showComponent==="pastTrips" && <PastBookings pastBookings={pastBookings} />}               
            </div>
        </div>
    )
};