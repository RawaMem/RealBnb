import { createContext, useContext, useState } from 'react';
import { getListingImagesAction } from '../context/../store/listings';

export const ListingContext = createContext();

export const useListing = () => useContext(ListingContext);

export default function ListingProvider({children}) {
    const [name, setName] = useState('');// 
    const [description, setDescription] = useState('');//
    const [serviceFee, setServiceFee] = useState(1);//
    const [cleaningFee, setCleaningFee] = useState(1);//


    // for multuple file upload
    const [multiImages, setMultiImages] = useState([]);//

    const [imageDescription, setImageDescription] = useState({});// nullable
    const [imgUrl, setImgUrl] = useState(''); //
    const [previewImageUrl, setPreviewImageUrl] = useState('') //

    const [listingPriceArr, setListingPriceArr] = useState([]);

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
                categoryArr,
                setCategoryArr                
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};