function isValidDate(value) {
	const date = new Date(value);

	return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

module.exports = { isValidDate };
