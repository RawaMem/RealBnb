import { Link } from "react-router-dom";

function UserListingCard({listing}) {
    // find current price within the date range
    //console.log(new Date(startDate).getTime() > new Date().getTime());
    const listingPriceArr = listing.ListingPrices;
    const curPrice = listingPriceArr.find(price => {
        const now = new Date().getTime();
        const start = new Date(price.startDate).getTime();
        const end = new Date(price.endDate).getTime();
        return start <= now <= end
    });
    
    function convertDate(date) {
        const dateObj = new Date(date);

        const year = dateObj.getFullYear(); 
        const month = dateObj.getMonth() + 1; 
        const day = dateObj.getDate();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return formattedDate;
    }

    console.log('current price', curPrice)

    return (
            <div className="userListingCard-container">
                <Link to={`/listings/${listing.id}`} style={{textDecoration: "none"}} className="userListingCard-clickable-container">
                    <div className="userListingCard-image-container">
                        <img src={listing.previewImageUrl} alt={listing.name} className="userListingCard-image" />
                    </div>

                    <div className="userListingCard-info-container">
                        <h5>{listing.name}</h5>
                        <div>{listing.address}, {listing.city}, {listing.state} {listing.zipcode}</div>
                        <div>{curPrice.pricePerDay} night</div>
                        <div>Price valid from {convertDate(curPrice.startDate)} to {convertDate(curPrice.endDate)}</div>
                    </div>
                </Link>

                <div id="edit-delete-btn-container">
                    <div>Edit</div>
                    <div><span className="material-symbols-outlined">
                        delete
                    </span></div>
                </div>
            </div>
    );
};

export default UserListingCard;