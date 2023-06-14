/**
 * Function that determines the maximum duration between listings.
 * 
 * @param {DurationsArray} durations an array of durations, in seconds, between listings. 
 * @returns {Number} the maximum duration between listings.
 */
export function determineMaximumDuration(durations) {
    let maximumDuration = -Infinity;

    for (let num of durations) {
        if (num === null) return num;
        if (num > maximumDuration) maximumDuration = num;
    }
    return maximumDuration;
}