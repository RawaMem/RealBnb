import { useMemo } from "react";

/**
 * useValidListingPrices is a custom hook that returns a set with the listing ids that have at least one range of dates that fall within the rate associated with current wishlist.
 * 
 * @param {ListingPrices} listingArray an array of formatted listing prices.
 * @param {WishList} currentWishList The current wishlist.
 * @returns {Set} a set with listing ids.
 */
export function useValidListingPrices(listingArray, currentWishList) {
  return useMemo(() => {
    const tempSet = new Set();
    listingArray.forEach((listing) => {
      /*
        The following if statement checks if the start date of the listing is less than or equal to the check in date of the wishlist and if the end date of the listing is greater than or equal to the check out date of the wishlist.
      */
      if (
        new Date(listing.startDate) <= new Date(currentWishList.checkIn) &&
        new Date(listing.endDate) >= new Date(currentWishList.checkOut)
      ) {
        tempSet.add(Number(listing.listingId));
      }
    });
    return tempSet;
  }, [listingArray, currentWishList]);
}
