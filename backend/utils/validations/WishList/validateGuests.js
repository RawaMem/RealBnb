/**
 * Validate the number of adults and children guests.
 *
 * @param {number} adultGuests - The number of adult guests (age 13 or above).
 * @param {number} childGuests - The number of child guests (ages 2-12).
 * @returns {Object} An object containing validation error messages for each field, if any.
 */
function validateGuests(adultGuests, childGuests) {
	const errors = {};
	if (adultGuests + childGuests > 16) {
		errors["adultGuests"] = "The maximum number of adults + children cannot exceed 16.";
	}
	if (adultGuests === 16 && childGuests > 0) {
		errors["childGuests"] =
			"The number of children cannot be greater than 0 when the number of adult guests is 16.";
	}

	return errors;
}

module.exports = {
	validateGuests,
};
