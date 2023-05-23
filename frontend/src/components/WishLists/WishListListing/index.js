import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import ListingCard from "../../Listings/ListingCard";
import {
  deleteWishlistThunk,
  getUserWishlistsThunk,
} from "../../../store/wishlists";
import { getListingsThunk } from "../../../store/listings";
import { Modal } from "../../../context/Modal";

export function WishListListing() {
  const { wishlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { wishLists, wishListListing } = useSelector(
    (state) => state.wishlists
  );
  const { id } = useSelector((state) => state.session.user);
  const { allListings } = useSelector((state) => state.listings);
  const currentWishList = wishLists[wishlistId];
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(currentWishList?.name || "");

    useEffect(() => {
    if (currentWishList) {
      setName(currentWishList.name);
    }
    }, [wishLists]);

  useEffect(() => {
    dispatch(getUserWishlistsThunk(id));
  }, [dispatch, id, wishlistId]);
  useEffect(() => {
    dispatch(getListingsThunk());
  }, [dispatch, wishlistId]);
  const listingSet = new Set();
  currentWishList?.Listings.forEach((listing) => listingSet.add(listing.id));

  const filteredLists = Object.values(allListings).filter((listing) =>
    listingSet.has(listing.id)
  );

  async function deleteWishlist() {
    await dispatch(deleteWishlistThunk(wishlistId));
    history.push("/wishlists");
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)}>DELETE</button>
      {showModal && <Modal onClose={() => setShowModal(false)}>
        <>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        <button type="submit" onClick={() => deleteWishlist()}>Delete this wishlist</button>
        </>
        </Modal>}
      {filteredLists.map((listing) => (
        <NavLink
          key={listing.id}
          style={{ textDecoration: "none" }}
          to={`/listings/${listing.id}`}
        >
          <ListingCard listing={listing} wishListListing={wishListListing} />
        </NavLink>
      ))}
    </div>
  );
}
