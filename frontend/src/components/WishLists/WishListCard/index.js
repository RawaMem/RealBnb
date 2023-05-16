import "./WishListCard.css";
export function WishListCard({ wishlist, listingId, singleListing }) {
  return (
    <div className="wishListCard-item">
      <div className="wishListCard-container">
        {singleListing?.Images?.slice(2).map((image, idx) => (
          <div key={singleListing.id} className={`wishListCard-item-${idx}`}>
            <img className="wishListCardImg" src={image.url} alt={`${image.description}`} />
          </div>
        ))}
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
