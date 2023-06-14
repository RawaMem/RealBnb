import { useMemo } from "react";
import { determineMaximumDuration } from "../../../utils/WishList";

const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

/**
 * useDetermineZoom is a custom hook that returns a zoom level based on the maximum duration between listings.
 * 
 * @param {DurationsArray} durations an array of durations, in seconds, between listings.
 * @returns {Number} a zoom level.
 */
export function useDetermineZoom(durations) {
    return useMemo(() => {
        if (durations === undefined) return 2;
        if (durations.length) {
        // We can't just Math.max(...durations) because if a distance can't be calculated then the value will be null. Null, in this case, represents far distances like country to country, so we want to return a zoom level that will show the entire world.
        const maxDurationInSeconds = determineMaximumDuration(durations);
        if (maxDurationInSeconds === null) return 2;
        const maxDurationInMinutes = maxDurationInSeconds / SECONDS_IN_A_MINUTE;
        const maxDurationInHours = maxDurationInMinutes / MINUTES_IN_AN_HOUR;
        if (maxDurationInHours < 5) return 8.5;
        if (maxDurationInHours < 10) return 7.5;
        if (maxDurationInHours < 15) return 6.5;
        if (maxDurationInHours < 20) return 5.5;
        if (maxDurationInHours < 25) return 4.5;
        if (maxDurationInHours < 40) return 3.5;
        if (maxDurationInHours < 60) return 2.5;  
        return 2;
        }
    }, [durations]);
}