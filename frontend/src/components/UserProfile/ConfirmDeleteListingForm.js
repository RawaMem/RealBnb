import { useDispatch } from "react-redux";
import { deleteUserListingThunk } from "../../store/listings";

function ConfirmDeleteListingForm({setShowConfirmDeleteForm, previewImageUrl, listingId}) {

    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(deleteUserListingThunk(listingId))
        .then(() => setShowConfirmDeleteForm(false));
    };

    return (
        <div className="confirmDeleteListingForm-container">

            <div className="confirmDeleteListingForm-top">
                <div className="confirmDeleteListingForm-image-container">
                    <img src={previewImageUrl} className="confirmDeleteListingForm-preview-image" />
                </div>
                <div className="confirmDeleteListingForm-contents-container">
                    <div>Deleting this listing will permanently remove it from the site.<br />Are you sure you want to proceed?</div>
                </div>
            </div>

            <div className="confirmDeleteListingForm-bottom-container">
                <div className="confirmDeleteListingForm-bottom-inner-container">
                    <div 
                    style={{cursor:"pointer"}}
                    onClick={() => setShowConfirmDeleteForm(false)}
                    >
                        No, Keep Listing
                    </div>
                    <div 
                    style={{cursor:"pointer"}}
                    onClick={handleDelete}
                    >
                        Yes, Delete Listing
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteListingForm;