import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearListingStateAction, getSingleListingThunk } from "../../store/listings";
import HostAndSpecs from "./HostAndSpecs";
import ReviewFormModal from "./ReviewFormModal";
import ReviewsContainer from "./ReviewsContainer";
import SingleListingImages from "./SingleListingImages";
import SingleListingTitle from "./SingleListingTitle";
import BookingsContainer from "./BookingsContainer";
import './SingleListingPage.css';


export default function SingleListingPage() {
    const { listingId } = useParams()
    const dispatch = useDispatch()

    // const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)


    const currentUser = useSelector(state => state.session.user)
    const listing = useSelector(state => state.listings.singleListing)
    const reviews = useSelector(state => state.reviews)

    console.log("reviews", reviews)
    useEffect(() => {
        dispatch(getSingleListingThunk(listingId))

        return () => dispatch(clearListingStateAction())
    }, [dispatch, listingId])


    if (!listing.Images) return <div className="loading">Loading...</div>

    console.log("listing",listing)
    return (
        <>
        <div className="singleListingPageContainer">
        {listing && (
            <div className="listingContent">
                <div className="singleListingTitleContainer">
                    <SingleListingTitle listing={listing} currentUser={currentUser} dispatch={dispatch}/>
                </div>
                <div className="singleListingImageContainer">
                    <SingleListingImages listingImages={listing.Images}/>
                </div>
                <div className="hostAndSpecsContainer">
                    <HostAndSpecs listing={listing}/>
                </div>
                {/* <div className="createReviewBtnContainer">
                    <ReviewFormModal
                    showCreateReviewModal={showCreateReviewModal}
                    setShowCreateReviewModal={setShowCreateReviewModal}
                    currentUser={currentUser}
                    listingId={listingId}/>
                </div> */}
                <div className="reviewContainer">
                    <ReviewsContainer
                    // showCreateReviewModal={showCreateReviewModal}
                    // setShowCreateReviewModal={setShowCreateReviewModal}
                    listingId={listingId}
                    reviews={reviews}
                    currentUser={currentUser}/>
                </div>
            </div>
        )}
        </div>
        </>
    )
}
