

export default function SingleListingTitle({ listing }) {


    function calcAveReviewScore(reviewArr) {
        let total = 0
        reviewArr.forEach(review => {
            total += review.starRating
        })
        return total/reviewArr.length
    }


    return (
        <div className="singleListingTitleContent">
            <div className="upperTitle">{listing.name}</div>
            <div className="lowerTitle">
                <div className="reviewStar">{calcAveReviewScore(listing.Reviews)}</div>
                <div className="reviewAverageScore">{listing.city}</div>
                <div className="listingCityState">{listing.state}</div>
                {!!listing.WishLists.length ? (
                    <>
                        <div className="wishListHeart">RedHeartImageNeededHere</div>
                        <div className="wishListSaveText">Saved</div>
                    </>
                ): (
                <>
                    <div className="wishListHeart">GreyHeartImageNeededHere</div>
                    <div className="wishListSaveText">Save</div>
                </>)}
            </div>


        </div>
    )
}