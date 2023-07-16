import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistsThunk } from "../../../store/wishlists";
import "../WishList.css";

import { createWishlistListingThunk } from "../../../store/wishlists";
import "./WishListCard.css";
import SingleWishList from "../SingleWishList";
export function WishListCard({ wishlist, singleListing, listingId, setWishListModalOpen, setModalOpen }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  async function addListingToExistingWishList() {
    if (listingId) {
      await dispatch(createWishlistListingThunk(wishlist.id, listingId));
      if (setWishListModalOpen) {
        dispatch(getUserWishlistsThunk(sessionUser.id));
        setWishListModalOpen(false);
        setModalOpen(null);
      }
    }
  }

  if (listingId) {
    return (
      <div 
      style={{cursor: "pointer"}} onClick={addListingToExistingWishList}
      >
        <SingleWishList wishlist={wishlist} singleListing={singleListing} />
      </div>
    )
  } else {
    return (
      <NavLink
        to={`/wishlists/${wishlist.id}`}
        className="wishlist-card-navlink"
      >
        <SingleWishList wishlist={wishlist} singleListing={singleListing} />
      </NavLink>
    );
  }
}
