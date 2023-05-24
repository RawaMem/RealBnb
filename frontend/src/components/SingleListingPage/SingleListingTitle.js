import { useHistory } from "react-router-dom";
import { useReceiverId } from "../../context/ReceiverId";
import { useDispatch } from "react-redux";
import { createDMThreadsThunk } from "../../store/directMessageThreads";

export default function SingleListingTitle({ listing, currentUser }) {
  const {setThreadIdFromListing} = useReceiverId();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const thread = await dispatch(createDMThreadsThunk({hostId: listing.ownerId, guestId: currentUser.id}))
    // console.log('this is created thread in listing page@@@@@@@', thread)
    setThreadIdFromListing(thread.id)
    history.push(`/messages`)

  };

  return (
    <div className="singleListingTitleContent">

      <div className="upperTitle">
        <h1>{listing.name}</h1>
      </div>

      <div className="singleListing-lowerTitle-container">
        <div className="singleListing-lowerTitle-left-container">

          <div className="reviewStar-container">
            <span className="material-icons">
              star
            </span>
            {listing.avgRating === "NaN" ? "New" : listing.avgRating }
          </div>
          <div>&middot;</div>
          <div>{listing.totalNumOfReviews} reviews</div>
          <div>&middot;</div>
          <div className="reviewAverageScore">{listing.city}, {listing.state}</div>
        </div>

        <div className="singleListing-lowerTitle-right-container">

          <div className="wishListHeart-container">
            {listing.WishLists && !!listing.WishLists.length ? (
              <>
                <div className="wishListHeart">
                  <span className="material-icons" style={{ color: 'red' }}>
                        favorite
                  </span>
                </div>
                <div className="wishListSaveText">Saved</div>
              </>
            ) : (
              <>
                <div className="wishListHeart">
                  <span className="material-symbols-rounded">
                    favorite
                  </span>
                </div>
                <div className="wishListSaveText">Save</div>
              </>
            )}
          </div>

          <div
            className="single-listing-send-message-btn-container"
            onClick={handleSendMessage}
          >
            Message Host
          </div>
        </div>

      </div>
    </div>
  );
}
