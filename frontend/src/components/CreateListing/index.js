import { useState } from "react"
import { useSelector } from "react-redux"
import Introducing from "./Introducing";
import './createListing.css';
import AddressForm from "./AddressForm";
import BedGuestForm from "./BedGuestForm";
import { Route } from "react-router-dom";


export default function CreateListing() {
    const listingOwner = useSelector( state => state.session.user);
    // console.log('listingOwner', listingOwner) {id: 1, username: 'Demo-lition', email: 'demo@user.io'}
    const ownerId = listingOwner?.id;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceFee, setServiceFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [bedrooms, setBedRooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [baths, setBaths] = useState(0);
    const [maxGuests, setMaxGuests] = useState(1);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [longitude, setLongitude] = useState(10);
    const [latitude, setLatitude] = useState(10);
    const [imageDescription, setImageDescription] = useState('');
    const [listingPriceArr, setListingPriceArr] = useState([]);
    const [amenityArr, setAmenityArr] = useState([]);
    const [categoryArr, setCategoryArr] = useState([]);
    const [page, setPage] = useState(1);
    console.log('this is address', address);
    console.log('this is address city main', city);
    console.log('this is longitude', longitude);
    console.log('this is latitude', latitude);

    switch(page) {
        case 1:
            return (
                <div className="listingform-container">
                    <Introducing setPage={setPage} />
                </div>
            );
        case 2:
            return (
                <div className="listingform-container">
                    <AddressForm 
                    address={address}
                    setAddress={setAddress} 
                    setCity={setCity} 
                    city={city} 
                    state={state} 
                    setState={setState} 
                    zipCode={zipCode} 
                    setZipCode={setZipCode} 
                    setLongitude={setLongitude} setLatitude={setLatitude} 
                    setPage={setPage}
                    />
                </div>
            );
        case 3:
            return (
                <div className="listingform-container">
                    <BedGuestForm 
                    setMaxGuests={setMaxGuests}
                    setBeds={setBeds}
                    setBedRooms={setBedRooms}
                    setBaths={setBaths}
                    setPage={setPage}
                    />
                </div>
            )
    };
};