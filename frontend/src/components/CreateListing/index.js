import { useState } from "react"
import { useSelector } from "react-redux"
import Introducing from "./Introducing";
import './createListing.css';
import GuestBedsForm from "./GuestBedsForm";
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
    const [zipCode, setZipCode] = useState(0);
    const [longitude, setLongitude] = useState(10);
    const [latitude, setLatitude] = useState(10);
    const [imageDescription, setImageDescription] = useState('');
    const [listingPriceArr, setListingPriceArr] = useState([]);
    const [amenityArr, setAmenityArr] = useState([]);
    const [categoryArr, setCategoryArr] = useState([]);
    const [page, setPage] = useState(1);


    switch(page) {
        case 1:
            return (
                <div className="listingform-container">
                    <Introducing setPage={setPage} />
                </div>
            )
        case 2:
            return (
                <div className="listingform-container">
                    <GuestBedsForm maxGuests={maxGuests} setMaxGuests={setMaxGuests} beds={beds} setBeds={setBeds} bedrooms={bedrooms} setBedRooms={setBedRooms} baths={baths} setBaths={setBaths} />
                </div>
            )
    };
};