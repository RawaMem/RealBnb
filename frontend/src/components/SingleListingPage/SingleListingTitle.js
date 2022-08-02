

export default function SingleListingTitle({listingName, reviews, city, state, country, wishListSave}) {



    return (
        <div className="singleListingTitleContainer">
            <div className="upperTitle">{listingName}</div>
            <div className="lowerTitle">
                <div className="reviewStar"></div>
                <div className="reviewAverageScore"></div>
                <div className="listingCityState"></div>
                <div className="wishListHeart"></div>
                <div className="wishListSaveText"></div>
            </div>


        </div>
    )
}
