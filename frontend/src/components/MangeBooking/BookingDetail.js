import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory} from "react-router-dom";
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

    const userId = useSelector(state => state.session.user.id);

    const history = useHistory();
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingDetailThunk(bookingId));
    }, [dispatch]);

    function bookingStatus() {
        const status = "future"
        const startDate = new Date(bookingState.startDate);
        const endDate = new Date(bookingState.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if(startDate <= today && today <= endDate) status = "onGoing";
        if(today >= endDate) status = "past";
        
        return status
    };


    const markerContent = (
        <div className="booking-detail-marker-content-container">
            <span 
                className="material-symbols-outlined"
                id="material-symbols-mylocation"
            >
                location_home
            </span>
            <div className="booking-detail-marker-content">
                {bookingStatus() === "past" && "Where you stayed"}
                {bookingStatus() === "onGoing" && "Where you are staying"}
                {bookingStatus() === "future" && "Where you will be staying"}
            </div>
        </div>
    );


    if(!bookingState.id) return null;

    return (
        <div className="bookingDetail-container">
            <div 
                className="material-symbols-arrow-back-container"
                onClick={() => history.push(`/user-bookings/${userId}`)}
            >
                <span 
                    className="material-symbols-outlined"
                    id="material-symbols-arrow-back"
                >
                    arrow_back
                </span>
            </div>
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
                    <div className="bookingDetail-guests-container">
                        <div className="bookingDetail-guests-inner-container">
                            Guest Total: <div style={{color: "rgb(117,117,117)", marginLeft: "2%"}}>     {bookingState.numOfGuests}</div>
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
                        style={{width: "98%", height: "100%", filter: "brightness(80%)"}}
                        markerContent={markerContent}
                        zoom={14}
                    />
                </div>
            </div>
        </div>
    );
};