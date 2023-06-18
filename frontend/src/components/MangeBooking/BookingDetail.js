import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetailThunk } from "../../store/bookings";
import { GeoLocationMap } from "../Maps/GeoLocationMap";
import "./ManageBooking.css";

export function convertDate(dateStr) {

    let date = new Date(dateStr);

    let options = { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' };

    let formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};


export default function BookingDetail() {
    const {bookingId} = useParams();

    const bookingState = useSelector(state => state.bookings);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingDetailThunk(bookingId));
    }, [dispatch]);

    console.log("bookingState", bookingState)

    if(!bookingState.id) return null;

    return (
        <div className="bookingDetail-container">
            <div className="bookingDetail-inner-container">
                <div className="bookingDetail-left-container">
                    <div className="bookingDetail-listing-preview-container">
                        <img 
                            src={bookingState.listingPreviewImage} 
                            alt="booking detail" 
                            className="bookingDetail-listing-preview"
                        />
                        <div className="bookingDetail-host-info">
                            You stay at {bookingState.listingHostUsername}'s place
                        </div>
                    </div>
                    <div className="bookingDetail-dates-container">
                        <div className="bookingDetail-check-in-container">
                            <div className="bookingDetail-dates-inner-container">
                                <div className="bookingDetail-check-in-title">Check-in</div>
                                <div className="bookingDetail-dates-contents">{convertDate(bookingState.startDate)}</div>
                            </div>
                        </div>
                        <div className="bookingDetail-checkout-container">
                            <div className="bookingDetail-dates-inner-container">
                                <div className="bookingDetail-check-in-title">Checkout</div>
                                <div className="bookingDetail-dates-contents">{convertDate(bookingState.endDate)}
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="bookingDetail-pricing-container">
                        <div className="bookingDetail-pricing-inner-container">
                            <div className="bookingDetail-pricing-title">Total Cost: $ {bookingState.totalCost}</div>
                            <div className="bookingDetail-pricing-title">Average Cost Per Day: $ {bookingState.avePricePerDay}</div>
                        </div>
                    </div>
                </div>
                <div className="bookingDetail-right-container">
                    <GeoLocationMap 
                        latitude={bookingState.listingLat} 
                        longitude={bookingState.listingLng}
                        style={{width: "98%", height: "100%"}}
                    />
                </div>
            </div>
        </div>
    );
};