import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getToken } from '../../store/maps';
import InputField from "../../ui/TextField";

function StepOne({listingData, setActiveStep}) {
    const dispatch = useDispatch();

    const [name, setName] = useState(listingData.name)
    const [address, setAddress] = useState(listingData.address);
    const [city, setCity] = useState(listingData.city);
    const [state, setState] = useState(listingData.state);
    const [zipCode, setZipCode] = useState(listingData.zipCode)
    const [bedroom, setBedroom] = useState(listingData.bedrooms);
    const [beds, setBeds] = useState(listingData.beds);
    const [baths, setBaths] = useState(listingData.baths);
    const [maxGuests, setMaxGuests] = useState(listingData.maxGuests);
    const [description, setDescription] = useState(listingData.description);
    const [longitude, setLongitude] = useState(listingData.longitude);
    const [latitude, setLatitude] = useState(listingData.latitude);

    const token = useSelector((state) => state.maps.token);

    useEffect(() => {
        if(!token) dispatch(getToken());
    }, [dispatch]);

    const handlePageOneToPageTwo = () => {

        localStorage.setItem("name", name);
        localStorage.setItem("address", address);
        localStorage.setItem("city", city);
        localStorage.setItem("state", state);
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem("bedroom", bedroom);
        localStorage.setItem("beds", beds);
        localStorage.setItem("baths", baths);
        localStorage.setItem("maxGuests", maxGuests);
        localStorage.setItem("description", description);

        const geocodingApi = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}, ${state} ${zipCode}.json?access_token=${token}&autocomplete=true`;

        fetch(geocodingApi)
        .then(res => res.json())
        .then(data => {
            const coordinates = data['features'][0]['geometry']['coordinates']
            console.log("coordinates", coordinates)
            // localStorage.setItem('lat', latitude);
            // localStorage.setItem('lng', longitude)
        })
        .then(() => setActiveStep(2));
    };




    return (
        <div className='edit-listing-form-container'>
            <div className="address-section-container">
                <InputField size={ { m: 2, width: '35ch' }} setter={setName} val={name} label={"Name"} id={"standard-basic"}  multiline={false} variant={"standard"} />      

                <InputField size={ { m: 2, width: '35ch' }} setter={setAddress} val={address} label={"Address"} id={"standard-basic"}  multiline={false} variant={"standard"} />      

                <InputField size={ { m: 2, width: '35ch' }} setter={setCity} val={city} label={"City"} id={"standard-basic"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 2, width: '35ch' }} setter={setState} val={state} label={"State"} id={"standard-basic"}  multiline={false} variant={"standard"} />   

                <InputField size={ { m: 2, width: '35ch' }} setter={setZipCode} val={zipCode} label={"Zip Code"} id={"standard-basic"}  multiline={false} variant={"standard"} />     
            </div>    
            <div className="listing-basic-info-container">
                <InputField size={ { m: 1, width: '10ch' }} setter={setBedroom} val={bedroom} label={"Bathrooms"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 1, width: '10ch' }} setter={setBeds} val={beds} label={"Beds"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 1, width: '10ch' }} setter={setBaths} val={baths} label={"Bathrooms"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 1, width: '10ch' }} setter={setMaxGuests} val={maxGuests} label={"Max Guests"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  
            </div>
            <div className="title-content-div">
                <InputField size={ { m: 1, width: '50ch' }} setter={setDescription} val={description} label={"Description"} id={"outlined-multiline-static"}  multiline={true} rows={5} />
            </div>
            <div onClick={handlePageOneToPageTwo}>
                Next
            </div>
        </div>
    );
};

export default StepOne;
