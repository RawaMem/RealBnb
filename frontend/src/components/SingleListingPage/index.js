import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearListingStateAction, getSingleListingThunk, removeBooking } from "../../store/listings";
import HostAndSpecs from "./HostAndSpecs";
import ReviewsContainer from "./ReviewsContainer";
import SingleListingImages from "./SingleListingImages";
import SingleListingTitle from "./SingleListingTitle";
import CreateBookingForm from "./CreateBookingForm";


export default function SingleListingPage() {
    const { listingId } = useParams()
    const dispatch = useDispatch()
    const allListings = useSelector(state => state.listings)
    let listing;
    if (allListings) listing = allListings.currentListing
    console.log(' this is listing from SingleListingPage', listing)

    useEffect(() => {
        dispatch(getSingleListingThunk(listingId))

        return () => dispatch(clearListingStateAction())
    }, [dispatch, listingId])

    const handleDelete = e => {
        dispatch(removeBooking(e.target.value))
    };

    return (
        <>
            <div className="singleListingPageContainer">
                {listing && (
                    <div className="listingContent">
                        {!!listing.Bookings.length && listing.Bookings.map((booking, i) => (
                            <div>
                                <h2>booking #{i}</h2>
                                <h2>total cost: {booking.totalCost}</h2>
                                <h3>start date: {booking.startDate}</h3>
                                <h3>end date: {booking.endDate}</h3>
                                <button onClick={handleDelete} value={booking.id}>DELETE</button>
                            </div>
                        ))}
                        <CreateBookingForm />
                        <div className="singleListingTitleContainer">
                            <SingleListingTitle listing={listing} />
                        </div>
                        <div className="singleListingImageContainer">
                            <SingleListingImages listing={listing} />
                        </div>
                        <div className="hostAndSpecsContainer">
                            <HostAndSpecs listing={listing} />
                        </div>
                        <div className="reviewContainer">
                            <ReviewsContainer listing={listing} />
                        </div>

                    </div>
                )}
            </div>


        </>
    )

}
