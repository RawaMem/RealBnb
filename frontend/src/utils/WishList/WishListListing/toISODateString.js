/**
 * Converts a Date object to an ISO-8601 formatted date string, but in local time.
 * This is similar to Date.toISOString(), but doesn't convert to UTC.
 * CREDITS TO: https://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
 *
 * @param {Date} date - The date to convert.
 * @returns {string} The date as a string in the format YYYY-MM-DDTHH:MM:SS±HH:MM.
 */
export function toISODateString(date) {
    // Get the timezone offset in minutes, then convert it to milliseconds.
    const tzo = -date.getTimezoneOffset(),
        // If the timezone offset is zero or positive, dif will be '+', otherwise '-'.
        dif = tzo >= 0 ? '+' : '-',
        // Helper function to add a leading zero to single-digit numbers.
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    // Format the date and time into the desired format. The timezone offset is included at the end.
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}