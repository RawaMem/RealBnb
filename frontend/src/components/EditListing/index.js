import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getToken } from '../../store/maps';
import InputField from "../../ui/TextField";
import { getListingInfoForEditThunk } from "../../store/listings";
import EditAmenity from "./EditAmenity";
import EditCategory from "./EditCategory";
import AddDeleteImages from "./AddDeleteImage";
import "./editListing.css";


function EditListingForm() {
    const {listingId} = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("")
    const [bedroom, setBedroom] = useState(1);
    const [beds, setBeds] = useState(1);
    const [baths, setBaths] = useState(1);
    const [maxGuests, setMaxGuests] = useState(1);
    const [description, setDescription] = useState("");
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [amenityArr, setAmenityArr] = useState([]);
    const [categoryArr, setCategoryArr] = useState([]);

    const [imageArr, setImageArr] = useState([]);
    const [removedImageIds, setRemovedImageIds] = useState([]);
    const [addedImages, setAddedImages] = useState([]);
    const [multiImages, setMultiImages] = useState([]);



    useEffect(() => {     
      dispatch(getListingInfoForEditThunk(listingId))
      .then(listingData => {
        setName(listingData.name)
        setAddress(listingData.address)
        setCity(listingData.city)
        setState(listingData.state)
        setZipCode(listingData.zipCode)
        setBedroom(listingData.bedrooms)
        setBeds(listingData.beds)
        setBaths(listingData.baths)
        setMaxGuests(listingData.maxGuests)
        setDescription(listingData.description)
        setAmenityArr(listingData.Amenities)
        setCategoryArr(listingData.Categories)
        setImageArr(listingData.Images)
      })
    },[]);

    // const token = useSelector((state) => state.maps.token);

    // useEffect(() => {
    //     if(!token) dispatch(getToken());
    // }, [dispatch]);


    return (
        <div className="editlistingform-container">

          <div className="editListingForm-inner-container">

            <div className="address-section-container">
                <InputField size={ { m: 2, width: '35ch' }} setter={setName} val={name} label={"Name"} id={"standard-basic"}  multiline={false} variant={"standard"} />      

                <InputField size={ { m: 2, width: '35ch' }} setter={setAddress} val={address} label={"Address"} id={"standard-basic"}  multiline={false} variant={"standard"} />      

                <InputField size={ { m: 2, width: '35ch' }} setter={setCity} val={city} label={"City"} id={"standard-basic"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 2, width: '35ch' }} setter={setState} val={state} label={"State"} id={"standard-basic"}  multiline={false} variant={"standard"} />   

                <InputField size={ { m: 2, width: '35ch' }} setter={setZipCode} val={zipCode} label={"Zip Code"} id={"standard-basic"}  multiline={false} variant={"standard"} />     
            </div>   

            <div className="listing-basic-info-container">
                <InputField size={ { m: 2, width: '10ch' }} setter={setBedroom} val={bedroom} label={"Bedrooms"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 2, width: '10ch' }} setter={setBeds} val={beds} label={"Beds"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 2, width: '10ch' }} setter={setBaths} val={baths} label={"Bathrooms"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  

                <InputField size={ { m: 2, width: '10ch' }} setter={setMaxGuests} val={maxGuests} label={"Max Guests"} type={"number"} id={"filled-number"}  multiline={false} variant={"standard"} />  
            </div>

            <div className="title-content-div">
                <InputField size={ { m: 2, width: '65ch' }} setter={setDescription} val={description} label={"Description"} id={"outlined-multiline-static"}  multiline={true} rows={10} />
            </div>

            <div className="amenities-container">
              <EditAmenity amenityArr={amenityArr} setAmenityArr={setAmenityArr} />
            </div>

            <div>
              <EditCategory categoryArr={categoryArr} setCategoryArr={setCategoryArr} />
            </div>
          </div>

          <div className="edit-image-main-container">
            <AddDeleteImages 
            imageArr={imageArr} 
            setImageArr={setImageArr} 
            removedImageIds={removedImageIds}
            setRemovedImageIds={setRemovedImageIds}
            addedImages={addedImages}
            setAddedImages={setAddedImages}
            setMultiImages={setMultiImages}
            />
          </div>
        </div>
    )
};

export default EditListingForm;