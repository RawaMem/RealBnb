import { createContext, useContext, useState } from 'react';

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({children}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceFee, setServiceFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [bedrooms, setBedRooms] = useState(1);
    const [beds, setBeds] = useState(1);
    const [baths, setBaths] = useState(1);
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
                imageDescription,
                setImageDescription,
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