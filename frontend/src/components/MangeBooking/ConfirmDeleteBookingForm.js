import { useDispatch } from "react-redux";
import { removeBookingThunk } from "../../store/bookings";
import "./ManageBooking.css";

export default function ConfirmDeleteBookingForm({setShowConfirmDeleteForm, bookingId,previewImageUrl}) {
    const dispatch = useDispatch();


    function handleDelete() {
        dispatch(removeBookingThunk(bookingId))
        setShowConfirmDeleteForm(false);
      
    };

    return (
        <div className="confirmDeleteListingForm-container">

            <div className="confirmDeleteListingForm-top">
                <div className="confirmDeleteListingForm-image-container">
                    <img src={previewImageUrl} className="confirmDeleteListingForm-preview-image" />
                </div>
                <div className="confirmDeleteBookingForm-contents-container">
                    <div className="confirmDeleteBookingForm-contents-inner-container">
                        <div className="confirmDeleteBookingForm-contents-top">
                            Please note that deleting this booking will permanently remove it from your account<br />
                            However, you can always make a new booking if your plans change. <br />
                        </div>
                        Are you certain you want to proceed with this cancellation?
                    </div>
                </div>
            </div>

            <div className="confirmDeleteListingForm-bottom-container">
                <div className="confirmDeleteListingForm-bottom-inner-container">
                    <div
                    className="confirmDeleteForm-button" 
                    style={{cursor:"pointer"}}
                    onClick={() => setShowConfirmDeleteForm(false)}
                    >
                        No, Keep Booking
                    </div>
                    <div 
                    className="confirmDeleteForm-button" 
                    style={{cursor:"pointer"}}
                    onClick={handleDelete}
                    >
                        Yes, Delete Booking
                    </div>
                </div>
            </div>
        </div>
    );
};