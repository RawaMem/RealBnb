import { useHistory } from "react-router-dom";
import { useReceiverId } from "../../context/ReceiverId";

export default function SingleListingTitle({ listing, currentUser }) {

  const {receiverId, setReceiverId} = useReceiverId();
  const history = useHistory()

  const handleSendMessage = (e) => {
    e.preventDefault();
    setReceiverId(listing.ownerId)
    history.push('/messages')

  };

  return (
    <div className="singleListingTitleContent">
      <div className="upperTitle">{listing.name}</div>
      <div className="lowerTitle">
        {listing && <div className="reviewStar">{listing.avgRating}</div>}
        <div className="reviewAverageScore">{listing.city}</div>
        <div className="listingCityState">{listing.state}</div>
        {listing.WishLists && !!listing.WishLists.length ? (
          <>
            <div className="wishListHeart">RedHeartImageNeededHere</div>
            <div className="wishListSaveText">Saved</div>
          </>
        ) : (
          <>
            <div className="wishListHeart">GreyHeartImageNeededHere</div>
            <div className="wishListSaveText">Save</div>
          </>
        )}
        <div
          className="single-listing-send-message"
          onClick={handleSendMessage}
        >
          Send a Message to the Host
        </div>
      </div>
    </div>
  );
}
