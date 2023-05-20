import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import ListingCard from "../../Listings/ListingCard";
import { getUserWishlistsThunk } from "../../../store/wishlists";
import { getListingsThunk } from "../../../store/listings";

export function WishListListing() {
  const { wishlistId } = useParams();
  const dispatch = useDispatch();
  const { wishLists, wishListListing } = useSelector(
    (state) => state.wishlists
  );
  const { id } = useSelector((state) => state.session.user);
  const { allListings } = useSelector((state) => state.listings);
  const currentWishList = wishLists[wishlistId];

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

  return (
    <div>
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
