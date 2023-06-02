import { useMemo } from "react";

/**
 * useListingArray is a custom hook that returns an array of formatted listing prices. This hook also attaches the listingId to each item in that array.
 * 
 * @param {HashMap} listingPricesHashMap a hashmap of listing prices associated with the current wishlist
 * @returns {Array} an array of formatted listing prices.
 */
export function useListingArray(listingPricesHashMap) {
  return useMemo(() => {
    return Object.entries(listingPricesHashMap).flatMap(
      ([listingId, listings]) =>
        listings.map((listing) => ({ ...listing, listingId }))
    );
  }, [listingPricesHashMap]);
}
