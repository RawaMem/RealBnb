import React from "react";
import { wishlistDateFormatter } from "../../../utils/WishList/wishlistDateFormatter";
import "../WishList.css";


function SingleWishList({wishlist, singleListing}) {
  const wishListListings = wishlist.Listings;

  const imageUrls = wishListListings.map(listing => listing.Images[0].url);

  let leftImage = null;
  let rightImageTop = null;
  let leftImageBottom = null;

  if(imageUrls[0]) leftImage = imageUrls[0];
  if(imageUrls[1]) rightImageTop = imageUrls[1];
  if(imageUrls[2]) leftImageBottom = imageUrls[2];

  return (
    <div className="wishListCard-item">
      <div 
        className="single-wishlist-img-container"
      >
          <div className="single-wishlist-left-image-container">
              {leftImage && <img src={leftImage} alt="wishlist-left" /> }
          </div>

          <div className="single-wishlist-right-image-container">
              <div className="single-wishlist-right-image-container-top">
                  {rightImageTop && <img src={rightImageTop} alt="wishlist-top-right" />}
              </div>

              <div className="single-wishlist-right-image-container-bottom">
                  {leftImageBottom && <img src={leftImageBottom} alt="wishlist-bottom-right" />}
              </div>
          </div>
      </div>

      <div className="single-wishlist-name-container">
        <div className="single-wishlist-name-top-container">
          <h5>{wishlist.name}</h5>
          <div>{wishListListings.length} Saved</div>
        </div>
        {wishlist.checkIn && (
          <p>{wishlistDateFormatter(wishlist.checkIn, wishlist.checkOut)}</p>
        )}
      </div>
    </div>
  );
}

export default SingleWishList;
