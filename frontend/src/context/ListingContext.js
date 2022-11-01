import { createContext, useContext, useState } from 'react';
import { getListingImagesAction } from '../context/../store/listings';

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({children}) {
    const [name, setName] = useState('');// 
    const [description, setDescription] = useState('');//
    const [serviceFee, setServiceFee] = useState(1);//
    const [cleaningFee, setCleaningFee] = useState(1);//
    const [bedrooms, setBedRooms] = useState(+localStorage.getItem('bedrooms'));//
    const [beds, setBeds] = useState(+localStorage.getItem('beds'));//
    const [baths, setBaths] = useState(+localStorage.getItem('bathrooms'));//
    const [maxGuests, setMaxGuests] = useState(+localStorage.getItem('maxGuests'));//
    const [address, setAddress] = useState(localStorage.getItem('addressInputVal')|| '');//
    const [inputVal, setInputVal] = useState(localStorage.getItem('addressInputVal'))
    const [city, setCity] = useState(localStorage.getItem('city') || '');//
    const [state, setState] = useState(localStorage.getItem('state') || '');//
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || '');//
    const [longitude, setLongitude] = useState(localStorage.getItem('lng') || 10);//
    const [latitude, setLatitude] = useState(localStorage.getItem('lat')|| 10);//
    // for multuple file upload
    const [multiImages, setMultiImages] = useState([]);//

    const [imageDescription, setImageDescription] = useState({});// nullable
    const [imgUrl, setImgUrl] = useState(localStorage.getItem('imgUrls').split(',')); //
    const [previewImageUrl, setPreviewImageUrl] = useState(localStorage.getItem('previewImageUrl')) //
    const [listingPrice, setListingPrice] = useState(10);//
    const initalAmenityStr = localStorage.getItem('amenityArr');
    const amenity = initalAmenityStr.split(',');
    const [amenityArr, setAmenityArr] = useState([...amenity]);//
    const [categoryArr, setCategoryArr] = useState([]);



    return (
        <ListingContext.Provider
            value={{
                name,
                setName,
                description,
                setDescription,
                serviceFee,
                setServiceFee,
                cleaningFee,
                setCleaningFee,
                bedrooms,
                setBedRooms,
                beds,
                setBeds,
                baths,
                setBaths,
                maxGuests,
                setMaxGuests,
                address,
                setAddress,
                inputVal, 
                setInputVal,
                city,
                setCity,
                state,
                setState,
                zipCode,
                setZipCode,
                longitude,
                setLongitude,
                latitude,
                setLatitude,
                multiImages, 
                setMultiImages,
                imageDescription,
                setImageDescription,
                imgUrl, 
                setImgUrl,
                previewImageUrl, 
                setPreviewImageUrl,
                listingPrice,
                setListingPrice,
                amenityArr,
                setAmenityArr,
                categoryArr,
                setCategoryArr                
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};