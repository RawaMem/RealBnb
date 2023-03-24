import { useSelector } from 'react-redux';

export default function ConfirmFirm() {
    // for listing table
    const ownerId = useSelector(state => state.session)
    const previewImageUrl = localStorage.getItem('previewImageUrl') || '';
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

    const listPrice = +localStorage.getItem('listing price');

};