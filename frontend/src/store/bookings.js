import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "listings/CREATE_BOOKING";
const DELETE_BOOKING = "listings/DELETE_BOOKING";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";

const getUserBookings = bookings => ({
    type: GET_USER_BOOKINGS,
    bookings
});

const createBooking = booking => ({
    type: CREATE_BOOKING,
    booking
});

const deleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
});

export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch("/api/bookings/userBooking");

    if(response.ok) {
        const userBookingData = await response.json();
        dispatch(getUserBookings(userBookingData));
    };
};

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
        case GET_USER_BOOKINGS:
            const newState = {};
            action.bookings.forEach(booking => newState[booking.id] = booking);
            return newState;
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