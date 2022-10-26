import { createContext, useContext, useState } from 'react';

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({children}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceFee, setServiceFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [bedrooms, setBedRooms] = useState(1);//
    const [beds, setBeds] = useState(1);//
    const [baths, setBaths] = useState(1);//
    const [maxGuests, setMaxGuests] = useState(1);//
    const [address, setAddress] = useState(localStorage.getItem('addressInputVal'));//
    const [inputVal, setInputVal] = useState(localStorage.getItem('addressInputVal'))
    const [city, setCity] = useState(localStorage.getItem('city'));//
    const [state, setState] = useState(localStorage.getItem('state'));//
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode'));//
    const [longitude, setLongitude] = useState(10);//
    const [latitude, setLatitude] = useState(10);//
    // for multuple file upload
    const [multiImages, setMultiImages] = useState([]);//
    const [imageDescription, setImageDescription] = useState('');// nullable
    const [imgUrl, setImgUrl] = useState([]);
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [listingPriceArr, setListingPriceArr] = useState([]);
    const [amenityArr, setAmenityArr] = useState([]);//
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
                listingPriceArr,
                setListingPriceArr,
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