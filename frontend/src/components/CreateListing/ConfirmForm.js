import { useDispatch } from 'react-redux';
import { resetAmenity } from './AmenitiForm';
import { createNewListingThunk } from '../../store/listings';
import { getSingleListingThunk } from '../../store/listings';
import { useHistory } from 'react-router-dom';

export default function ConfirmForm({previewImageUrl, multiImages, setShowConformationForm, imageDescription}) {
    const dispatch = useDispatch();
    // for listing table
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
    const history = useHistory()

    // for amenity
    const amenityArr = resetAmenity('amenityArr'); 

    // for category
    const categoryArr = resetAmenity('categoryArr');

    const previewImageFile = multiImages.find(file => file.preview === previewImageUrl)

    // console.log('previewImageFile', previewImageFile)


    const handleSubmitCreateForm = async() => {
        const newListingObj = {
            previewImageFile,
            name,
            description,
            serviceFee,
            cleaningFee,
            bedrooms,
            beds,
            baths,
            maxGuests,
            address,
            city,
            state,
            zipCode,
            longitude,
            latitude
        };

        const listingImages = [multiImages, imageDescription];

        const amenities = amenityArr;

        const categories = categoryArr;

        const listingPricing = {
            pricePerDay: listPrice,
            startDate,
            endDate
        };

        const newListingRes = await dispatch(createNewListingThunk({newListingObj,  listingPricing}, {amenities, categories}, listingImages));
        if(newListingRes.ok) {
            const newListing = await newListingRes.json();
            history.push(`/listings/${newListing.id}`)
            setShowConformationForm(false)
        } 
    };

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
                    <div 
                        className='edit-photo-modal-save-button' 
                        style={{color:"white"}}
                        onClick={handleSubmitCreateForm}
                    >Confirm</div>
                </div>
            </div>
        </div>
    );
};
