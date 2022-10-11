import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearListingStateAction, getSingleListingThunk } from "../../store/listings";
import HostAndSpecs from "./HostAndSpecs";
import ReviewFormModal from "./ReviewFormModal";
import ReviewsContainer from "./ReviewsContainer";
import SingleListingImages from "./SingleListingImages";
import SingleListingTitle from "./SingleListingTitle";


export default function SingleListingPage() {
    const {listingId} = useParams()
    const dispatch = useDispatch()

    // const [showCreateReviewModal, setShowCreateReviewModal] = useState(false)


    const currentUser = useSelector(state => state.session.user)
    const allListings = useSelector(state => state.listings)
    const reviews = useSelector(state => state.reviews)
    let listing;
    if (allListings) listing = allListings.currentListing
    console.log(' this is listing from SingleListingPage', listing)

    useEffect(() => {
        dispatch(getSingleListingThunk(listingId))

        return () => dispatch(clearListingStateAction())
    }, [dispatch, listingId])

    return (
        <>
        <div className="singleListingPageContainer">
        {listing && (
            <div className="listingContent">
                <div className="singleListingTitleContainer">
                    <SingleListingTitle listing={listing}/>
                </div>
                <div className="singleListingImageContainer">
                    <SingleListingImages listing={listing}/>
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
