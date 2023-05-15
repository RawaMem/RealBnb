import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistsThunk } from "../../store/wishlists";
import { WishListCard } from "./WishListCard";

function WishList() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.wishlists);
  const { wishLists } = useSelector((state) => state.wishlists);
  const { wishListListing } = useSelector((state) => state.wishlists);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(getUserWishlistsThunk(user.id));
    }
    return () => {
      dispatch(clearWishlists());
    };
  }, [dispatch, user]);

  const listOfWishlists = Object.values(wishLists);

  return (
    <>
      {error && error !== "Unauthorized" && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {listOfWishlists.length && (
        <div>
          {listOfWishlists.map((wishlist) => (
            <div className="wishlist-container" key={`${wishlist.id}`} >
              <WishListCard
                wishlist={wishlist}
                listingId={
                  Object.values(wishListListing).find(
                    (listing) =>
                      wishlist.id === listing.WishListListing.wishlistId
                  ).WishListListing.listingId
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WishList;
