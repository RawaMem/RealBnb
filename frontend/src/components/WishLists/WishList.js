import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistsThunk } from "../../store/wishlists";
import { getSingleListingThunk } from "../../store/listings";
import { WishListCard } from "./WishListCard";
import "./WishList.css";

function WishList({
  listingId,
  setWishListModalOpen,
  setModalOpen,
}) {
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
          return dispatch(getSingleListingThunk(listingId, "WishList"));
        });
        const data = await Promise.all(promises);
        setListings(data);
      }
      fetchListingDetails();
    }
  }, [dispatch, user, wishLists]);

  return (
    <div className="wishlist-main-container">
      {error && error !== "Unauthorized" && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      {listOfWishlists.length && listings && (
        <>
          {listOfWishlists.map((wishlist, idx) => (            
            <WishListCard
              wishlist={wishlist}
              singleListing={listings[idx]}
              listingId={listingId}
              setWishListModalOpen={setWishListModalOpen}
              setModalOpen={setModalOpen}
              key={`${wishlist.id}`}
            />           
          ))}
        </>
      )}
    </div>
  );
}

export default WishList;
