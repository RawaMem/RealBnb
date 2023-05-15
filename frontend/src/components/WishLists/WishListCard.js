import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListingThunk } from "../../store/listings";

export function WishListCard({ wishlist, listingId }) {
  const dispatch = useDispatch();
  const { singleListing } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getSingleListingThunk(listingId));
  }, [dispatch]);
  return (
    <div className="wishlist-item">
      {listingId === singleListing.id && (
        <div className="wishListListing-container">
            {singleListing?.Images?.map((image) => (
                <>
                <img src={image.url} alt={`${image.description}`} />
                </>
            ) )}
        </div>
      )}
      <h3>{wishlist.name}</h3>
      {wishlist.checkIn && (
        <p>
          {wishlist.checkIn}-{wishlist.checkOut}
        </p>
      )}
    </div>
  );
}
