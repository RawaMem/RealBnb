import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useListing } from "../../context/ListingContext"
import './createListing.css';



export default function BedGuestForm() {
    const { setMaxGuests,maxGuests, setBeds, beds, setBedRooms, bedrooms, baths, setBaths} = useListing();

    const [initialAutoFill, setInitialAutoFill] = useState(false);

    useEffect(() => {
        setMaxGuests(+localStorage.getItem('maxGuests')>0 ? +localStorage.getItem('maxGuests') :  1);
        setBeds(+localStorage.getItem('beds') > 0 ?+localStorage.getItem('beds') : 1);
        setBedRooms(+localStorage.getItem('bedrooms') > 0 ? +localStorage.getItem('bedrooms') : 1);
        setBaths(+localStorage.getItem('bathrooms') > 0 ? +localStorage.getItem('bathrooms') : 1);
        setInitialAutoFill(true);

        return () => setInitialAutoFill(false);
    },[])

    useEffect(() => {
        localStorage.setItem('maxGuests', maxGuests);
        localStorage.setItem('beds', beds);
        localStorage.setItem('bedrooms', bedrooms);
        localStorage.setItem('bathrooms', baths);
    },[maxGuests, beds, bedrooms, baths])


    function handleAddDecrease(type, setter) {
        return (
            <div className="bedGuestForm-number-wrapper">
                {type > 1 ? <span onClick={() => setter(prev => prev - 1)} className="bedGuestForm-circle">-</span> : <span className="bedGuestForm-circle disabled">-</span>}
                <span>{type}</span>
                <span className="bedGuestForm-circle" onClick={()=> setter(prev => prev+1)}>+</span>
            </div>
        )
    };

    if (!initialAutoFill) return null
    return (
        <div className="form-container">
            <section className="bed-guest-left-section">
                <span className='word-section-1'>How many guests would you like to welcome?</span>
            </section>

            <section className="bedGuest-selection-container">
                <div className='bedGuest-content-container'>
                    <div className="grid-right-inner-container-bedGuestForm-innerDivContainer">
                        <div className="bedGuestForm-type">
                            Guests
                        </div>
                        {handleAddDecrease(maxGuests, setMaxGuests)}
                    </div>

                    <div className="grid-right-inner-container-bedGuestForm-innerDivContainer">
                        <div className="bedGuestForm-type">
                            Beds
                        </div>                      
                        {handleAddDecrease(beds, setBeds)}                     
                    </div>

                    <div className="grid-right-inner-container-bedGuestForm-innerDivContainer">
                        <div className="bedGuestForm-type">
                            Bedrooms
                        </div>
                        {handleAddDecrease(bedrooms, setBedRooms)}
                    </div>

                    <div className="grid-right-inner-container-bedGuestForm-innerDivContainer">
                        <div className="bedGuestForm-type">
                            Bathrooms
                        </div>
                        {handleAddDecrease(baths, setBaths)}
                    </div>
                </div> 
                <div className='button-layout'>
                    <div className="button-container-div">
                        <NavLink
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            to='/createListing/create-address'
                            >
                                Back
                        </NavLink>                    
                        <NavLink
                            className="edit-photo-modal-save-button"
                            style={{textDecoration:'none'}}
                            to='/createListing-amenitiForm'
                        >
                                <div>Next</div>
                        </NavLink>
                    </div>               
                </div>         
            </section>
        </div>
    )
}