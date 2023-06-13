import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getToken } from '../../store/maps';
import InputField from "../../ui/TextField";
import { clearListingStateAction, createCategoriesAmenitiesThunk, createListingImagesThunk, deleteListingImageByIdThunk, editListImagePreviewStatusThunk, editListingThunk, getListingInfoForEditThunk, removeCategoryAmenityThunk } from "../../store/listings";
import EditAmenity from "./EditAmenity";
import EditCategory from "./EditCategory";
import AddDeleteImages from "./AddDeleteImage";
import ClearBackgroundBtn from "../../ui/Buttons/ClearBackground";
import ConfirmAndNextBtn from "../../ui/Buttons/ConfirmAndNext";
import "./editListing.css";

function EditListingForm() {
  const {listingId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
  const [addedAmenities, setAddedAmenities] = useState([]);
  const [removedAmenityId, setRemovedAmenityId] = useState([]);

  const [categoryArr, setCategoryArr] = useState([]);
  const [addedCategories, setAddedCategories] = useState([]);
  const [removedCategoryId, setRemovedCategoryId] = useState([]);

  const [imageArr, setImageArr] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [addedImages, setAddedImages] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [multiImages, setMultiImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const token = useSelector((state) => state.maps.token);

  useEffect(() => {
      if(!token) dispatch(getToken());
      return () => clearListingStateAction();
  }, [dispatch]);

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
      setPreviewImageUrl(listingData.previewImageUrl)
    })
  },[]);

  useEffect(() => {
    if (hasSubmitted) {
      const newErrors = { ...errors };
      if (previewImageUrl) delete newErrors['previewImage'];
      if (imageArr.length >= 5) delete newErrors['imageQyt'];
      setErrors(newErrors);

    };
  }, [previewImageUrl, hasSubmitted, imageArr.length]);

  useEffect(() => {
    if(errors['previewImage']) alert(errors['previewImage']);
    if(errors['imageQyt']) alert(errors['imageQyt']);
  },[errors]);

  useEffect(() => {
    if(token) {
      const editedAddress = `${address} ${city} ${state}`;
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${editedAddress}.json?access_token=${token}&autocomplete=true`;
  
      try {
        fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          const addressObj = data.features[0];
          if(addressObj) {
            const cor = addressObj.center;
            setLatitude(cor[1]);
            setLongitude(cor[0]);
          }
        })
      } catch(e) {
        console.log('Error fetching data', e);
      };
    };
  },[address, city, state, token])

  async function handleSubmit() {
    const imageFormError = {};

    if(!previewImageUrl) imageFormError['previewImage']="Please click the drop down and select a preview image for your listing";

    if(imageArr.length < 5) imageFormError['imageQyt']="Please add at least 5 images for your property";

    if(Object.values(imageFormError).length) {
      setErrors(imageFormError);

      setHasSubmitted(true);
      return;
    };

    const editedList = {
      name,
      address,
      city,
      state,
      zipCode,
      bedrooms:bedroom,
      beds,
      baths,
      maxGuests,
      description,
      longitude,
      latitude
    };

    const amenityAndCategory = {
      amenities: addedAmenities,
      categories: addedCategories
    };

    const addedImageArr = [addedImages, {}];

    // find out if preview image is changed, if it is, change the preview of the new preview image to truth.
    // the preview image could have been stored in two places, one of the old images that was stored in S3, or one of the new images added.
    for(const imgObj of imageArr) {
      if(imgObj.preview) {
        if(imgObj.url !== previewImageUrl) dispatch(editListImagePreviewStatusThunk(imgObj.id, false))
      } else {
        if(imgObj.url === previewImageUrl && imgObj.id && !imgObj.preview) dispatch(editListImagePreviewStatusThunk(imgObj.id, true));
        else if(imgObj.url === previewImageUrl && !imgObj.id) {
          // then it's stored in the newly added image array
          setAddedImages(prev => {
            const newAddedImages = prev.map(imgObj => {
              if(imgObj.file.preview === previewImageUrl) {
                imgObj.preview = true
              };
            });
            return newAddedImages
          });
        };
      }      
    }

    const newEditedListing = await dispatch(editListingThunk(editedList, listingId))

    if(newEditedListing) {
      if(removedCategoryId.length || removedAmenityId) {
        dispatch(removeCategoryAmenityThunk(removedCategoryId, removedAmenityId))
      };
      if(removedImageIds.length) dispatch(deleteListingImageByIdThunk(removedImageIds)).dispatch(createCategoriesAmenitiesThunk(amenityAndCategory, listingId));
      if(addedImageArr.length) await dispatch(createListingImagesThunk(listingId, addedImageArr));

      await dispatch(clearListingStateAction())
      history.push(`/listings/${listingId}`);
    };
  };

  if(!token) return null;

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
              <EditAmenity 
              amenityArr={amenityArr} 
              setAmenityArr={setAmenityArr} 
              setAddedAmenities={setAddedAmenities}
              setRemovedAmenityId={setRemovedAmenityId}
              addedAmenities={addedAmenities}
              />
            </div>

            <div>
              <EditCategory 
              categoryArr={categoryArr} 
              setCategoryArr={setCategoryArr} 
              addedCategories={addedCategories}
              setAddedCategories={setAddedCategories}
              setRemovedCategoryId={setRemovedCategoryId}
              />
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
            previewImageUrl={previewImageUrl}
            setPreviewImageUrl={setPreviewImageUrl}
            />
          </div>

          <div className="edit-listing-btn-container">
            <div className="edit-listing-btn-inner-container">
                <ClearBackgroundBtn btnText={"Cancel"} />
                <ConfirmAndNextBtn 
                  textColor={"white"} 
                  btnText={"Confirm"} 
                  disabled={Object.values(errors).length} 
                  onClick={handleSubmit}
                />
            </div>
          </div>
        </div>
    )
};

export default EditListingForm;