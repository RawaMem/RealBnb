import { useSelector } from 'react-redux';
import { resetAmenity } from './AmenitiForm';

export default function ConfirmForm({previewImageUrl, multiImages, setShowConformationForm, imageDescription}) {
    // for listing table
    const owner = useSelector(state => state.session.user)
    const name = localStorage.getItem('listing_name');
    const description = localStorage.getItem('listing description');
    const serviceFee = localStorage.getItem('service fee');
    const cleaningFee = localStorage.getItem('cleanning fee');
    const bedrooms = localStorage.getItem('bedrooms');
    const beds = localStorage.getItem('beds');
    const baths = localStorage.getItem('bathrooms');
    const maxGuests = localStorage.getItem('maxGuests');
    const address = localStorage.getItem('addressInputVal');
    const city = localStorage.getItem('city');
    const state = localStorage.getItem('state');
    const zipCode = localStorage.getItem("zipCode");
    const longitude = +localStorage.getItem('lng');
    const latitude = +localStorage.getItem('lat');

    // for listing price
    const listPrice = +localStorage.getItem('listing price');
    const startDate = localStorage.getItem('startingDate');
    const endDate = localStorage.getItem('endingDate');

    // for amenity
    const amenityArr = resetAmenity('amenityArr'); 

    // for category
    const categoryArr = resetAmenity('categoryArr');

    return (
        <div id='confirmation-form-container'>
            <div className='confirmation-form-top'>
                <div className='confirmation-form-preview-image-container'>
                    <img className="confirmation-form-preview-image" src={previewImageUrl} />
                </div>
                <div className='confirmation-form-contents-container'>              
                    <div style={{fontSize: '30px'}}>You are all set!</div>
                    <div style={{fontSize:'18px'}}>Click Confirm to launch your listing!</div>                   
                </div>
            </div>

            <div className='confirmation-form-bottom'>
                <div className="confirmation-form-bottom-inner-container">
                    <div id="edit-photo-modal-delete-button" style={{cursor:"pointer"}}><u onClick={()=>setShowConformationForm(false)}>Cancel</u></div>
                    <div className='edit-photo-modal-save-button' style={{color:"white"}}>Confirm</div>
                </div>
            </div>
        </div>
    );
};
