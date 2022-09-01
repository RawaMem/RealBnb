import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearListingStateAction, getSingleListingThunk } from "../../store/listings";
import HostAndSpecs from "./HostAndSpecs";
import SingleListingImages from "./SingleListingImages";
import SingleListingTitle from "./SingleListingTitle";


export default function SingleListingPage() {
    const {listingId} = useParams()
    const dispatch = useDispatch()
    const allListings = useSelector(state => state.listings)
    let listing;
    if (allListings) listing = allListings.currentListing

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
                <div className="hostAndSpecs">
                    <HostAndSpecs listing={listing}/>
                </div>
            </div>
        )}
        </div>


        </>
    )

}
