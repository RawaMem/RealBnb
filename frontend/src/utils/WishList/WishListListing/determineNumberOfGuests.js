/**
 * Determine the number of guests and pets, and format the result as a string.
 * @param {number} adults - The number of adults.
 * @param {number} children - The number of children.
 * @param {number} pets - The number of pets.
 * @returns {string} - A string representing the number of guests and pets.
 */
export function determineNumberOfGuests(adults = 0, children = 0, pets = 0) {
    // Sum the number of adults and children to get the total number of guests.
    let numberOfGuests = adults + children;

    // Generate the guest part of the string.
    let guestPart = numberOfGuests === 1 ? `${numberOfGuests} guest` : `${numberOfGuests} guests`;
    
    // If there are no pets, return only the guest part.
    if (pets === 0) {
        return guestPart;
    }

    // Generate the pet part of the string.
    let petPart = pets === 1 ? `${pets} pet` : `${pets} pets`;

    // Return the combined guest and pet parts.
    return `${guestPart}, ${petPart}`;
}
