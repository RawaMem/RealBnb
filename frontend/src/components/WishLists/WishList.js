import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistsThunk } from "../../store/wishlists";
import { getSingleListingThunk } from "../../store/listings";
import { WishListCard } from "./WishListCard";
// import "./WishList.css";

function WishList({wishListStyle}) {
  const dispatch = useDispatch();
  const [listings, setListings] = useState([]);
  const { error } = useSelector((state) => state.wishlists);
  const { wishLists } = useSelector((state) => state.wishlists);
  const { wishListListing } = useSelector((state) => state.wishlists);
  const user = useSelector((state) => state.session.user);
 
  useEffect(() => {
    if (user) {
      dispatch(getUserWishlistsThunk(user.id));
    }
  }, [dispatch, user]);

  const listOfWishlists = Object.values(wishLists);

  useEffect(() => {
    if (user) {
      async function fetchListingDetails() {
        const promises = listOfWishlists.map((wishlist) => {
          if (!wishlist.Listings.length) return;
          const listingId = wishlist.Listings.find((listing) => listing).id;
          // TODO: Handle situation where there are NO Listings and .find returns undefined.
          return dispatch(getSingleListingThunk(listingId));
        });
        const data = await Promise.all(promises);
        setListings(data);
      }
      fetchListingDetails();
    }
  }, [dispatch, user, wishLists]);

  return (
    <>
      {error && error !== "Unauthorized" && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      {listOfWishlists.length && listings && (
        <div style={wishListStyle}>
          {listOfWishlists.map((wishlist, idx) => (
            <div className="wishlist-item" key={`${wishlist.id}`}>
              <WishListCard
                wishlist={wishlist}
                singleListing={listings[idx]}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WishList;
