import { useMemo } from "react";

/**
 * useValidListings is a custom hook that returns an array of listings that are valid meaning, they have at least one range of dates that fall within the rate associated with current wishlist and the number of guests is less than or equal to the max number of guests allowed by the listing.
 * 
 * @param {Array} filteredLists the listings associated with the wishlist.
 * @param {WishList} currentWishList the current wishlist.
 * @param {Set} listingPricesSet a set with listing ids.
 * @returns {Array} an array of listings that are valid.
 */
export function useValidListings(filteredLists, currentWishList, listingPricesSet){
  return useMemo(() => {
    return filteredLists.filter((listing) => {
      return (
        currentWishList?.checkIn && currentWishList?.adultGuests ? listing.maxGuests >=
          currentWishList?.adultGuests + currentWishList?.childGuests &&
        listingPricesSet.has(listing.id) : listing.maxGuests >= currentWishList?.adultGuests + currentWishList?.childGuests
      );
    });
  }, [filteredLists, currentWishList, listingPricesSet]);
}
