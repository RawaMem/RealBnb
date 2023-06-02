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
                    <DatePicker state={state} dispatch={dispatch} />
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