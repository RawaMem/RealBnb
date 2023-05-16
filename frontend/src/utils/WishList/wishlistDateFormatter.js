/**
 * Formats the given dates into a string representing the date range.
 * @param {string} date1 - The first date in UTC format.
 * @param {string} date2 - The second date in UTC format.
 * @returns {string} The formatted date range string.
 */
export function wishlistDateFormatter(date1, date2) {
  const checkInDate = [];
  const checkOutDate = [];
  const checkIn = new Date(date1);
  const checkOut = new Date(date2);
  const checkInMonth = checkIn.toLocaleDateString("en-US", { month: "long" });
  const checkOutMonth = checkOut.toLocaleDateString("en-US", { month: "long" });
  const checkInDay = checkIn.getUTCDate();
  const checkOutDay = checkOut.getUTCDate();

  checkInDate.push(checkInMonth);
  checkOutDate.push(checkOutMonth);

  checkInDate.push(checkInDay);
  checkOutDate.push(checkOutDay);

  if (checkInMonth !== checkOutMonth) {
    return `${checkInDate.join(" ")} - ${checkOutDate.join(" ")}`;
  }
  return `${checkInDate.join(" ")} - ${checkOutDate.slice(1).join(" ")}`;
}
