import { useState } from "react";
import { NavLink } from "react-router-dom";
import './createListing.css';


export default function BedGuestForm() {

    function initalData(localStorageKey) {
        const localStorageVal = localStorage.getItem(localStorageKey);
        if(localStorageVal) return +localStorageVal
        else return 1
    };

    const [maxGuests, setMaxGuests] = useState(initalData('maxGuests'));
    const [beds, setBeds] = useState(initalData('beds'));
    const [bedrooms, setBedRooms] = useState(initalData('bedrooms'));
    const [baths, setBaths] = useState(initalData('bathrooms'));

    function handlePageChange() {
        localStorage.setItem('maxGuests', maxGuests);
        localStorage.setItem('beds', beds);
        localStorage.setItem('bedrooms', bedrooms);
        localStorage.setItem('bathrooms', baths);
    }

    function handleAddDecrease(type, setter) {
        return (
            <div className="bedGuestForm-number-wrapper">
                {type > 1 ? <span onClick={() => setter(prev => prev - 1)} className="bedGuestForm-circle">-</span> : <span className="bedGuestForm-circle disabled">-</span>}
                <span>{type}</span>
                <span className="bedGuestForm-circle" onClick={()=> setter(prev => prev+1)}>+</span>
            </div>
        )
    };

    return (
        <div className="form-container">
            <section className="bed-guest-left-section">
                <span className='word-section-1'>How many guests would you like to welcome?</span>
            </section>

            <section className="right-section-container">
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
                            onClick={handlePageChange}
                            >
                                Back
                        </NavLink>                    
                        <NavLink
                            className="edit-photo-modal-save-button"
                            style={{textDecoration:'none'}}
                            onClick={handlePageChange}
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