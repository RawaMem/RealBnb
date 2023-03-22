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

    // for multuple file upload
    const [multiImages, setMultiImages] = useState([]);//

    const [imageDescription, setImageDescription] = useState({});// nullable
    const [imgUrl, setImgUrl] = useState(''); //
    const [previewImageUrl, setPreviewImageUrl] = useState('') //

    const [listingPriceArr, setListingPriceArr] = useState([]);
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