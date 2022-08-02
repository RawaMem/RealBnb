import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleListingThunk } from "../../store/listings";
import SingleListingTitle from "./SingleListingTitle";


export default function SingleListingPage() {
    const {listingId} = useParams()
    const dispatch = useDispatch()

    const listing = useSelector(state => state.listings)

    useEffect(() => {
        dispatch(getSingleListingThunk(listingId))
    }, [dispatch, listingId])

    return (
        <>
        <div className="singleListingPageContainer">
        {listing && (
            <div className="listingContent">
                <div className="singleListingTitleContainer">

                    <SingleListingTitle
                    listing
                    listingName={listing.name}
                    reviews={listing.Reviews}
                    city={listing.city}
                    state={listing.state}
                    country={listing.country}
                    wishListSave={listing.WishLists}

                    />
                </div>
            </div>
        )}
        </div>


        </>
    )

}
