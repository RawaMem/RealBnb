import { useMemo } from "react";

/**
 * useListingSet is a custom hook that returns a set of listing ids associated with the current wishlist.
 * 
 * @param {Listings} listings an array of listings associated with the current wishlist.
 * @returns {Set} listingSet a set of listing ids associated with the current wishlist.
 */
export function useListingSet(listings) {
  return useMemo(() => {
    const listingSet = new Set();
    listings?.forEach((listing) => listingSet.add(listing.id));
    return listingSet;
  }, [listings]);
}
