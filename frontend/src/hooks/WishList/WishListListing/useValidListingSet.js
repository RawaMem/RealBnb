import { useMemo } from "react";

/**
 * useValidListingSet is a custom hook that returns a set containing the ids of the listings that are valid..
 * 
 * @param {Array} validListings the listings that either are in range for the start/endDate or the number of guests is less than or equal to that one defined in the wishlist..
 * @returns {Set} the listing ids from the validListing array.
 */
export function useValidListingSet(validListings) {
  return useMemo(() => {
    const validListingSet = new Set();
    validListings.forEach((listing) => validListingSet.add(listing.id));
    return validListingSet;
  }, [validListings]);
}
