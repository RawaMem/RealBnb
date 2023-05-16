export function WishListCard({ wishlist, listingId, singleListing }) {
  return (
    <div className="wishlist-item">
        <div className="wishListListing-container">
            {singleListing?.Images?.map((image) => (
                <>
                <img src={image.url} alt={`${image.description}`} />
                </>
            ) )}
        </div>
      <h3>{wishlist.name}</h3>
      {wishlist.checkIn && (
        <p>
          {wishlist.checkIn}-{wishlist.checkOut}
        </p>
      )}
    </div>
  );
}
