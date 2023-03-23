import { createContext, useContext, useState } from 'react';
import { getListingImagesAction } from '../context/../store/listings';

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({children}) {
    const [name, setName] = useState('');// 
    const [description, setDescription] = useState('');//
    const [serviceFee, setServiceFee] = useState(1);//
    const [cleaningFee, setCleaningFee] = useState(1);//

    const [imageDescription, setImageDescription] = useState({});// nullable


    const [listingPriceArr, setListingPriceArr] = useState([]);




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
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};