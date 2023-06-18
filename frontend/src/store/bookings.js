import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
const GET_BOOKING_DETAIL = "bookings/GET_BOOKING_DETAIL"

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

const getBookingDetail = booking => ({
    type: GET_BOOKING_DETAIL,
    booking
});


export const getBookingDetailThunk = bookingId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}/detail`);

    if(response.ok) {
        const booking = await response.json();
        dispatch(getBookingDetail(booking));
    };
};

export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch("/api/bookings/userBooking");

    if(response.ok) {
        const userBookingData = await response.json();
        dispatch(getUserBookings(userBookingData));
    };
};

export const createBookingThunk = booking => async dispatch => {
    const response = await csrfFetch('/api/bookings/create', {
        method: "POST",
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    }
};

export const removeBookingThunk = bookingId => async dispatch => {
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
            newState[action.booking.id] = action.booking;
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = { ...state };
            delete newState[action.bookingId];
            return newState;
        }
        case GET_BOOKING_DETAIL: {
            const newState = action.booking;
            return newState;
        }
        default:
            return state;
    }
}