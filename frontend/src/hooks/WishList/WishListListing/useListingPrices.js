import { useMemo } from "react";

/**
 * useListingPrices is a custom hook that returns a hashmap of listing prices associated with the current wishlist.
 * 
 * @param {allListings} listings the normalized allListings object from the redux store that includes information about all listings.
 * @param {*} listingSet a set of listing ids associated with the current wishlist.
 * @returns {HashMap} listingPricesHashMap a hashmap of listing prices associated with the current wishlist.
 */
export function useListingPrices(listings, listingSet) {
  const listingsWithListingPrices = useMemo(() => {
    return Object.values(listings).filter((listing) => listingSet.has(listing.id));
  }, [listings, listingSet]);
  // The idea behind this is to have the id of the listing as the key and the listing price(which is a nested array) as the value.
  // This is wit the intention to avoid doing a nested loop in the future.
  const listingPricesHashMap = useMemo(() => {
    const hashMap = {};
    listingsWithListingPrices.forEach((listing) => {
      hashMap[listing.id] = listing.ListingPrices;
    });
    return hashMap;
  }, [listingsWithListingPrices]);

  return listingPricesHashMap;
}
