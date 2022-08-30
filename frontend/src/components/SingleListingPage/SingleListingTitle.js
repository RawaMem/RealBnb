

export default function SingleListingTitle({ listing }) {

    return (
        <div className="singleListingTitleContent">
            <div className="upperTitle">{listing.name}</div>
            <div className="lowerTitle">
                {listing && (<div className="reviewStar">{listing.avgRating}</div>)}
                <div className="reviewAverageScore">{listing.city}</div>
                <div className="listingCityState">{listing.state}</div>
                {listing.WishLists && !!listing.WishLists.length ? (
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
