import { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import DatePicker from "../../ui/DatePicker";
import { datePickerReducer } from "../../ui/DatePicker";
import BasicSelect from "../../ui/SelectField.js/BasicSelect";
import PinkPurpleBtn from "../../ui/Buttons/PinkPurpleBtn";
import { createBookingThunk } from "../../store/bookings";
import { csrfFetch } from "../../store/csrf";

function Booking({listing}) {
    const dispatchThunk = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    let today = new Date();

    const initialState = {
        startDate:null,
        endDate:null,
        focusedInput: null
    };

    const [state, dispatch] = useReducer(datePickerReducer, initialState);
    const [curPrice, setCurPrice] = useState(0);
    const [numOfDays, setNumsOfDays] = useState(1);
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [roomPrice, setRoomPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleNumOfGuestChange = (e) => setNumOfGuests(e.target.value);

    // find current price within the date range.
    const listingPriceArr = listing.ListingPrices;
    const validDates = [];
    listingPriceArr.forEach(openDates => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(openDates.startDate);
        const endDate = new Date(openDates.endDate);

        if(startDate <= today && today <= endDate) {
            const newOpenDate = {startDate: today.toISOString(), endDate: endDate.toISOString(), pricePerDay: openDates.pricePerDay};
            validDates.push(newOpenDate);
        } else if(today <= startDate) {
            validDates.push(openDates)
        }
    });

    useEffect(() => {    
        const curPrice = validDates.find(price => {
            const start = new Date(price.startDate).getTime();
            const end = new Date(price.endDate).getTime();
    
            const selectedStart = new Date(state.startDate).getTime();
            const selectedEnd = new Date(state.endDate).getTime();
            // if a start date is before the selected start date and an end date is after the selected end date. 
            if(start <= selectedStart && end >= selectedEnd) {
                return start <= selectedStart && end >= selectedEnd;         
            } else if(start > selectedStart) return start > selectedStart
        });
        const selectedDays = calculateDays(state.startDate, state.endDate);


        setCurPrice(curPrice);
        setNumsOfDays(selectedDays);
        setRoomPrice(+selectedDays * (+curPrice.pricePerDay));
        const cleaningFee = listing.cleaningFee;
        const serviceFee = listing.serviceFee;

        setTotalPrice((+cleaningFee)+(+serviceFee)+(+selectedDays * (+curPrice.pricePerDay)));
    }, [state]);

    function calculateDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Calculate the difference in milliseconds
        const diff = end.getTime() - start.getTime();
      
        // Convert milliseconds into days and return the result
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };


    function isDateBlocked(date) {
        const existingBooking = listing.Bookings;
        // the function should return a boolean, if true then date will be blocked
        // block all the past dates
        function blockPast() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today
        }

        function blockBookedDates() {
            const validBooking = [];
            existingBooking.forEach(booking => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const startDate = new Date(booking.startDate);
                const endDate = new Date(booking.endDate);
            
                if(startDate <= today && today <= endDate) {
                    const newDateToBlock = {startDate:today, endDate};
                    validBooking.push(newDateToBlock)
                } else if(today <= startDate) {
                    validBooking.push(booking)
                };
            });

            const dateString = date.toISOString().slice(0,10);

            for(let bookedDate of validBooking) {
                const start = new Date(bookedDate.startDate).toISOString().slice(0,10);
                const end = new Date(bookedDate.endDate).toISOString().slice(0,10);
            
                if(dateString >= start && dateString <= end) return true;
            };           
            return false;        
            };

        
            function blockClosedDates() {
                const currentOpenDates = listing.ListingPrices;
                const validDates = [];
                currentOpenDates.forEach(openDates => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const startDate = new Date(openDates.startDate);
                    const endDate = new Date(openDates.endDate);
            
                    if(startDate <= today && today <= endDate) {
                        const newOpenDate = {startDate: today.toISOString(), endDate: endDate.toISOString(), pricePerDay: openDates.pricePerDay};
                        validDates.push(newOpenDate);
                    } else if(today <= startDate) {
                        validDates.push(openDates)
                    }
                });

                const dateString = date.toISOString().slice(0,10);
                let isDateInRange = false;

                for(let openDate of validDates) {
                    const start = new Date(openDate.startDate).toISOString().slice(0, 10);
                    const end = new Date(openDate.endDate).toISOString().slice(0, 10);
                    
                    if(dateString >= start && dateString <= end) {
                        isDateInRange = true;
                        break;
                    }
            };

            return !isDateInRange;

        };

        return blockPast() || blockBookedDates() || blockClosedDates();
    };
   
    const daySize = [25, 26];

    const reserveBtnDisabled = !state.startDate && !state.endDate;

    const handleReserve = async() => {
        const avePricePerDay = (totalPrice / numOfDays).toFixed(2);
        const newBooking = {
            userId: sessionUser.id,
            listingId: listing.id,
            totalCost: totalPrice,
            avePricePerDay: avePricePerDay,
            numOfGuests,
            startDate: state.startDate.toISOString(),
            endDate: state.endDate.toISOString()
        };

        const previewImage = listing.Images.find(image => image.preview);
        const listingName = listing.name;

        const dataForStripe = {
            userId: sessionUser.id,
            imageUrl: previewImage.url,
            listingName: listingName,
            totalCost: totalPrice,
            listingId: listing.id,
            avePricePerDay: avePricePerDay,
            numOfGuests,
            startDate: state.startDate.toISOString(),
            endDate: state.endDate.toISOString()
        }

        const stripePaymentIntentRes = await csrfFetch("/api/bookings/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForStripe)
        })

        const stripeResult = await stripePaymentIntentRes.json();

        if(stripeResult.stripePaymentId) newBooking.stripePaymentIntentId = stripeResult.stripePaymentId;

        if(stripeResult.error) {
            console.error(stripeResult.error);
        } else {
            // confirm payment intent on client side
            window.location.replace(stripeResult.url);
            // const newlyCreatedBooking = await dispatchThunk(createBookingThunk(newBooking));
            // if(newlyCreatedBooking) history.push("/user-profile");
        }
        
    };

    if(!curPrice) return null;

    return (
        <div className="singleListing-booking-container">
            <div className="singleListing-booking-inner-container">
                <div className="price-reviews-container">
                    <div className="pricePerDay-booking">
                        ${curPrice.pricePerDay} night
                    </div>
                    <div className="price-reviews-container-right-section">
                        <div className="reviewStar-container">
                            <span className="material-icons">
                                star
                            </span>
                            {listing.avgRating === "NaN" ? "New" : listing.avgRating }
                        </div>
                        <div>&middot;</div>
                        <div>{listing.totalNumOfReviews <= 1 ? listing.totalNumOfReviews+" review" : listing.totalNumOfReviews+" reviews" }</div>
                    </div>
                </div>

                <div className="booking-datePicker-container">
                    <DatePicker state={state} dispatch={dispatch} isDateBlocked={isDateBlocked} daySize={daySize} />
                    <div className="booking-guest-selectField-container" >
                        <BasicSelect value={numOfGuests} label={"GUESTS"} style={{width: "430px"}} handleChange={handleNumOfGuestChange} maxGuest={listing.maxGuests} />
                    </div>
                </div>

                <div className="reserve-button-container">
                    <PinkPurpleBtn 
                        text={"Reserve"} 
                        style={{width: "430px", height: "50px"}} 
                        disbaled={reserveBtnDisabled}
                        onClick={handleReserve}
                    />
                    <p style={{marginTop:"5px"}}>You won't be charged yet</p>
                </div>

                <div className="fee-calculate-container">
                    <div>${curPrice.pricePerDay} x {numOfDays} {numOfDays === 1 ?" day" : " days"} </div>
                    <div>$ {roomPrice}</div>
                </div>

                <div className="fee-calculate-container">
                    <div>Cleaning fee</div>
                    <div>${listing.cleaningFee}</div>
                </div>

                <div className="fee-calculate-container">
                    <div>Service fee</div>
                    <div>${listing.serviceFee}</div>
                </div>
                <hr />
                <div className="fee-calculate-container">
                    <div>Total Cost for the getaway </div>
                    <div>$ {totalPrice}</div>
                </div>
            </div>
        </div>
    )
};

export default Booking;