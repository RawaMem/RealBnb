import React from "react";
import { wishlistDateFormatter } from "../../../utils/WishList/wishlistDateFormatter";
import "../WishListCard/WishListCard.css";


function SingleWishList({wishlist, singleListing}) {
  return (
    <div className="wishListCard-item">
      <div className="wishListCard-container">
        {singleListing?.Images?.slice(0, 3).map((image, idx) => (
          <div key={idx} className={`wishListCard-item-${idx}`}>
            <img
              className="wishListCardImg"
              src={image.url}
              alt={`${image.description}`}
            />
          </div>
        ))}
      </div>
      <h3>{wishlist.name}</h3>
      {wishlist.checkIn && (
        <p>{wishlistDateFormatter(wishlist.checkIn, wishlist.checkOut)}</p>
      )}
    </div>
  );
}

export default SingleWishList;
