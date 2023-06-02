import { useMemo } from "react";

/**
 * useFilteredLists is a custom hook that returns an array of listings that are associated with the current wishlist.
 * 
 * @param {allListings} listings the normalized allListings object from the redux store that includes information about all listings.
 * @param {Set} listingSet listingSet a set of listing ids associated with the current wishlist.
 * @returns {Listings} the listings associated with the wishlist.
 */
export function useFilteredLists(listings, listingSet) {
  return useMemo(() => {
    return Object.values(listings).filter((listing) =>
      listingSet.has(listing.id)
    );
  }, [listings, listingSet]);
}
