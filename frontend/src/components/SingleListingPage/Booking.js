import { useReducer, useState } from "react";
import DatePicker from "../../ui/DatePicker";
import { datePickerReducer } from "../../ui/DatePicker";
import BasicSelect from "../../ui/SelectField.js/BasicSelect";
import PinkPurpleBtn from "../../ui/Buttons/PinkPurpleBtn";

function Booking({listing}) {

    // find current price within the date range.
    const listingPriceArr = listing.ListingPrices;
    const curPrice = listingPriceArr.find(price => {
        const now = new Date().getTime();
        const start = new Date(price.startDate).getTime();
        const end = new Date(price.endDate).getTime();
        return start <= now <= end
    });

    let today = new Date();

    const initialState = {
        startDate: today,
        endDate: new Date( today.getTime() + (24 * 60 * 60 * 1000)),
        focusedInput: null
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

    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const [numOfGuests, setNumOfGuests] = useState(1)

    const handleNumOfGuestChange = (e) => setNumOfGuests(e.target.value);

    return (
        <div className="singleListing-booking-container">
            <div className="singleListing-booking-inner-container">
                <div className="price-reviews-container">
                    <div className="pricePerDay-booking">${curPrice.pricePerDay} night</div>
                    <div className="price-reviews-container-right-section">
                        <div className="reviewStar-container">
                            <span className="material-icons">
                                star
                            </span>
                            {listing.avgRating === "NaN" ? "New" : listing.avgRating }
                        </div>
                        <div>&middot;</div>
                        <div>{listing.totalNumOfReviews} reviews</div>
                    </div>
                </div>

                <div className="booking-datePicker-container">
                    <DatePicker state={state} dispatch={dispatch} isDateBlocked={isDateBlocked} daySize={daySize} />
                    <div className="booking-guest-selectField-container" >
                        <BasicSelect value={numOfGuests} label={"GUESTS"} style={{width: "430px"}} handleChange={handleNumOfGuestChange} maxGuest={listing.maxGuests} />
                    </div>
                </div>

                <div className="reserve-button-container">
                    <PinkPurpleBtn text={"Reserve"} style={{width: "430px", height: "50px"}} />
                    <p style={{marginTop:"5px"}}>You won't be charged yet</p>
                </div>

                <div className="fee-calculate-container">
                    <div>${curPrice.pricePerDay} x day nights</div>
                    <div>price</div>
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
                    <div>$ total price</div>
                </div>
            </div>
        </div>
    )
};

export default Booking;