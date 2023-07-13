import { useMemo } from "react";

/**
 * useExceedMaxGuestListings is a custom hook that returns an array of listings that are NOT valid meaning, they either don't have a set of dates that fall within the wishlist dates or that the number of guests exceeds the number of max guests associated with the listing.
 * 
 * @param {Array} filteredLists the listings associated with the wishlist.
 * @param {WishList} currentWishList the current wishlist.
 * @param {Set} listingPricesSet a set with listing ids.
 * @returns {Array} an array of listings that are NOT valid.
 */
export function useExceedMaxGuestListings (filteredLists, currentWishList, listingPricesSet) {
  return useMemo(() => {
    return filteredLists.filter((listing) => {
      return (
        currentWishList?.checkIn && currentWishList?.adultGuests ? listing.maxGuests <
          currentWishList?.adultGuests + currentWishList?.childGuests ||
        !listingPricesSet.has(listing.id) : listing.maxGuests <
        currentWishList?.adultGuests + currentWishList?.childGuests
      );
    });
  }, [filteredLists, currentWishList, listingPricesSet]);
}
