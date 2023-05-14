/**
 *  Validate the date string by checking if it follows the YYY-MM-DD format.
 *
 * @param {string} value a string representing the date in the format YYY-MM-DD.
 * @returns {boolean} true if the date is valid, false otherwise.
 */
function isValidDate(value) {
	const date = new Date(value);

	return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

module.exports = { isValidDate };
