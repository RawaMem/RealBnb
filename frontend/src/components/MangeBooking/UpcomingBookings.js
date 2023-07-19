import BookingCard from "./BookingCard";

export default function UpcomingBookings({upcomingBookings}) {

    return(
        <div className="user-listing-display-container">
            {upcomingBookings.map(booking => (
                <div key={booking.id} className="userListingCard-container">
                    <BookingCard 
                    booking={booking} 
                    type={"UpcomingBookings"}
                    />
                </div>
            ))}
        </div>
    )
};