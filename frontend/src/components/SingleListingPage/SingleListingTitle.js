import { useHistory } from "react-router-dom";
import { useReceiverId } from "../../context/ReceiverId";
import { useDispatch } from "react-redux";
import { createDMThreadsThunk } from "../../store/directMessageThreads";

export default function SingleListingTitle({ listing, currentUser, dispatch }) {
  const {setThreadIdFromListing} = useReceiverId();
  const history = useHistory()

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const thread = await dispatch(createDMThreadsThunk({hostId: listing.ownerId, guestId: currentUser.id}))
    // console.log('this is created thread in listing page@@@@@@@', thread)
    setThreadIdFromListing(thread.id)
    history.push(`/messages`)

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
