import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useReceiverId } from "../../context/ReceiverId";
import { useDispatch, useSelector } from "react-redux";
import { createDMThreadsThunk } from "../../store/directMessageThreads";
import { deleteWishlistListingThunk, getUserWishlistsThunk } from "../../store/wishlists";
import { Modal } from "../../context/Modal";
import { CreateWishListParentComponent } from "../WishLists/CreateParentComponent";
import LoginForm from "../LoginFormModal";
import { clearWishlists } from "../../store/wishlists";

export default function SingleListingTitle({ listing, currentUser }) {
  const { setThreadIdFromListing } = useReceiverId();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showCreateWishListModal, setShowCreateWishListModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const { user } = useSelector((state) => state.session);
  const { wishListListing } = useSelector((state) => state.wishlists);

  useEffect(() => {
    if (user) {
      dispatch(getUserWishlistsThunk(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
        dispatch(clearWishlists());
    }
}, [dispatch, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const thread = await dispatch(createDMThreadsThunk({ hostId: listing.ownerId, guestId: currentUser.id }))
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
            {listing.avgRating === "NaN" ? "New" : listing.avgRating}
          </div>
          <div>&middot;</div>
          <div>{listing.totalNumOfReviews} {listing.totalNumOfReviews < 1 ? "review" : "reviews"}</div>
          <div>&middot;</div>
          <div className="reviewAverageScore">{listing.city}, {listing.state}</div>
        </div>

        <div className="singleListing-lowerTitle-right-container">

          <div className="wishListHeart-container">
            {listing && wishListListing && listing.id in wishListListing ? (
              <>
                <div className="wishListHeart">
                  <span className="material-icons" style={{ color: 'red', cursor:"pointer" }} onClick={async () => {
                    if (!user) {
                      setShowLogInModal(listing.id);
                      return;
                    }
                 
                    if (listing.id in wishListListing) {
                      await dispatch(deleteWishlistListingThunk(wishListListing[listing.id].WishListListing.wishlistId, listing.id));
                      return;
                  }
                  }}>
                    favorite
                  </span>
                </div>
                <div className="wishListSaveText">Saved</div>
              </>
            ) : (
              <>
                <div className="wishListHeart">
                  <span className="material-symbols-rounded" onClick={async () => {
                    if (!user) {
                      setShowLogInModal(listing.id);
                      return;
                    }
                    setModalOpen("CreateWishListModal");
                  }}
                  style={{cursor:"pointer"}}
                  >
                    favorite
                  </span>
                </div>
                <div className="wishListSaveText">Save</div>
              </>
            )}
          </div>
          {modalOpen === "CreateWishListModal" && <CreateWishListParentComponent setModalOpen={setModalOpen} modalOpen="CreateWishListModal" user={user} listingId={listing.id} />}
          {showLogInModal === listing.id && (
            <Modal onClose={() => setShowLogInModal(false)}>
              <LoginForm setShowLogInModal={setShowLogInModal} />
            </Modal>
          )}

          <div
            className="single-listing-send-message-btn-container"
            onClick={() => window.alert("feature coming soon")}
          >
            Message Host
          </div>
        </div>

      </div>
    </div>
  );
}
