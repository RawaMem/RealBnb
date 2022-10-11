export default function BookingContainer({ listing }) {
    const handleDelete = e => {
        dispatch(removeBooking(e.target.value))
    };

    const calculateDays = (dateString1, dateString2) => {
        return Math.ceil((new Date(dateString2).getTime() - new Date(dateString1).getTime()) / (1000 * 3600 * 24))
    };

    console.log("here is the listing ===> ", new Date('2022-09-05T00:00:00.000Z') < new Date('2022-09-10T00:00:00.000Z'))

    return (
        <>
            {listing.Bookings.map(booking => (
                <div key={booking.id}>
                    <h2>{booking.id}</h2>
                    <p>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p>Price per day: ${booking.avePricePerDay}</p>
                    <p>Total cost: ${booking.totalCost}</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ))}
            <h2>Days Available</h2>
            {listing.ListingPrices.map(listingPrice => (
                <div key={listingPrice.id}>
                    <p>start date: {new Date(listingPrice.startDate).toLocaleDateString()}</p>
                    <p>end date: {new Date(listingPrice.endDate).toLocaleDateString()}</p>
                    <p>number of available days: {calculateDays(listingPrice.startDate, listingPrice.endDate)}</p>
                    <p>price per day: {listingPrice.pricePerDay}</p>
                </div>
            ))}
            <input type="date" />
        </>
    )
}

// Math.ceil((new Date(listingPrice.endDate).getTime() - new Date(listingPrice.startDate).getTime()) / (1000 * 3600 * 24))