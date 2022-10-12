const CREATE_BOOKING = "listings/CREATE_BOOKING";
const DELETE_BOOKING = "listings/DELETE_BOOKING";

const createBooking = booking => ({
    type: CREATE_BOOKING,
    booking
});

const deleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
});

export const buildBooking = booking => async dispatch => {
    const response = await csrfFetch('/booking', {
        method: "POST",
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    }
};

export const removeBooking = bookingId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteBooking(bookingId));
    }
};

export default function bookingsReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_BOOKING: {
            const newState = { ...state };
            
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = { ...state };

            return newState;
        }
        default:
            return state;
    }
}