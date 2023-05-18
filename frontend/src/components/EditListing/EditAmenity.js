import { useState } from "react";
import {icons} from "../../ui/icons";
import "./editListing.css";

function EditAmenity( {amenityArr, setAmenityArr, setAddedAmenities, addedAmenities, setRemovedAmenityId}) {
    const amenities = Object.keys(icons);

    const unSelectedAmenities = () => {
        const convertToLower = amenityArr.map(amenityObj => amenityObj.name.toLowerCase());
        return amenities.filter(a => !convertToLower.includes(a));
    };

    const [unSelected, setUnselected] = useState(unSelectedAmenities())

    const removeAmenity = (amenityIdx, amenity) => {
        setAmenityArr(prev => {
            const newAmenityArr = [...prev];
            newAmenityArr.splice(amenityIdx, 1);
            return newAmenityArr;
        });

        setUnselected(prev => {
            const newUnselectedArr = [...prev];
            newUnselectedArr.push(amenity.name);
            return newUnselectedArr;
        });

        if (amenity.id) setRemovedAmenityId(prev => [...prev, amenity.id]);

        if(addedAmenities.includes(amenity.name)) setAddedAmenities(prev => {
            const newRef = [...prev];
            const idx = newRef.indexOf(amenity.name);
            newRef.splice(idx, 1);
            return newRef;
        });        
    };

    const addAmenity = (amenityIdx, amenity) => {
        setUnselected(prev => {
            const newUnselectedArr = [...prev];
            newUnselectedArr.splice(amenityIdx, 1);
            return newUnselectedArr;
        });

        setAmenityArr(prev => {
            const newAmenityArr = [...prev];
            newAmenityArr.push({name: amenity});
            return newAmenityArr;
        });

        setAddedAmenities(prev => [...prev, amenity]);
    };


    return (
        <div className="edit-amenity-form-container">
            <h5>You have the following amenities selected</h5>

            <div className="edit-amenity-section">
                {amenityArr.map((amenity, idx) => (
                    <div className="edit-amenity-selection" key={amenity+idx} 
                    onClick={() => removeAmenity(idx, amenity)} 
                    >
                        <div>{amenity.name.toLowerCase()}</div>
                        <div className="operator-icon">-</div>
                    </div>
                ))}
            </div>

            <h5>Add more aminities to your listing</h5>
            <div className="edit-amenity-section">
                {unSelected.map((amenity, idx) => (
                    <div className="edit-amenity-selection" key={amenity+idx} 
                    onClick={() => addAmenity(idx, amenity)} 
                    >
                        <div>{amenity.toLowerCase()}</div>
                        <div className="operator-icon">+</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default EditAmenity;