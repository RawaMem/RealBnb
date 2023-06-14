import { useMemo } from "react";

/**
 * useDetermineInitialCoordinates is a custom hook that returns an array of the average latitude and longitude of the listings associated with the current wishlist.
 * 
 * @param {ListingArray} filteredLists an array of listings associated with the current wishlist.
 * @returns {CoordinatesArray} an array of the average latitude and longitude of the listings associated with the current wishlist. Useful for determining the initial coordinates of the map.
 */
export function useDetermineInitialCoordinates(filteredLists) {
    return useMemo(() => {
        let sumOfLatitudes = 0;
        let sumOfLongitudes = 0;
        if (filteredLists === undefined || !filteredLists.length) return [sumOfLatitudes, sumOfLongitudes];
        if (filteredLists.length) {
            filteredLists.forEach((list) => {
                sumOfLatitudes += Number(list.latitude);
                sumOfLongitudes += Number(list.longitude);
            });
            const averageLatitude = sumOfLatitudes / filteredLists.length;
            const averageLongitude = sumOfLongitudes / filteredLists.length;
            return [averageLatitude, averageLongitude];
        }
    }, [filteredLists]);
}