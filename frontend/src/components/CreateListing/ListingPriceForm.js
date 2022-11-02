import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { useListing } from "../../context/ListingContext";
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import './createListing.css';

export default function ListingPriceForm() {
    const {listingPriceArr, setListingPriceArr,serviceFee, setServiceFee, cleaningFee, setCleaningFee} = useListing();
    const [error, setError] = useState({});
    const [startingDate, setStartingDate] = useState(null);

    const [endingDate, setEndingDate] = useState(null);;
    const [focusedInput, setFocusedInput] = useState(null);
    const [listingPrice, setListingPrice] = useState(10);//
    const [startDateError, setStartDateError] = useState(false)
    const [endDateError, setEndDateError] = useState(false)

    useEffect(() => {
        setListingPrice(+localStorage.getItem("listing price"));
        setServiceFee(+localStorage.getItem("service fee"));
        setCleaningFee(+localStorage.getItem("cleanning fee"));
    },[]);

    useEffect(() => {
        localStorage.setItem("listing price", listingPrice);
        localStorage.setItem("service fee", serviceFee);
        localStorage.setItem("cleanning fee", cleaningFee);
        return () => console.log('this is listingPriceArr', listingPriceArr)
    },[listingPrice, serviceFee, cleaningFee, startingDate, endingDate]);

    useEffect(() => {
        let errorMsg = {}
        if(listingPrice < 10 || listingPrice > 10000) errorMsg['listingPrice']="Please enter a base price between $10 and $10,000.";
        setError(errorMsg);
        if(serviceFee < 1) errorMsg['serviceFee'] = "Service fee must be greater than $1";
        if(cleaningFee < 1) errorMsg['cleaningFee'] = "Cleaning fee must be greater than $1";
        setError(errorMsg)
        if(!startingDate) setStartDateError(true)
        else setStartDateError(false)
        
        if(!endingDate) setEndDateError(true)
        else setEndDateError(false)

    },[listingPrice, serviceFee, cleaningFee, startingDate, endingDate])

    function increment(setter) {
        console.log('in the setter ')
        return setter(prev => {
            if(prev + 5 <= 10000) return +prev+5;
            else return prev
        });
    };

    function decrement(setter) {
        return setter (prev => {
            if(prev - 5 >= 0) return +prev-5;
            else return prev
        })
    }

    function handleNext() {      
        const listPriceObj = {pricePerDay:listingPrice, startDate: startingDate, endDate: endingDate}
        setListingPriceArr(listPriceObj);        
    };

    return (
        <div className="form-container">
            <section className="video-section-container">
                <div className="video-description">Now, set your price</div>
                <video 
                    autoPlay 
                    controls
                    muted 
                    preload='auto' 
                    controlsList="play nodownload noplaybackrate"
                    disablePictureInPicture
                    playsInline
                    crossOrigin="anonymous"
                    style = {{ width:'100%', height: "100%"}}
                >
                    <source src="https://a0.muscache.com/v/9c/d4/9cd47434-c6bd-58ec-90b7-b50aa7dba461/9cd47434c6bd58ec90b7b50aa7dba461_4000k_1.mp4" />
                </video>
            </section>
            <section className="price-form-container">
                <div className="price-content">
                    <div className="price-content-innerContainer">
                        <div id="price-content-innerContainer-id">
                            <div className="price-section">                            
                                <label htmlFor="listing-price">Price per night</label>
                                <div className="price-setting-container">
                                    <div 
                                    id="control-button"
                                    onClick={() => decrement(setListingPrice)}
                                    style={listingPrice>=10?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >-</div>
                                    <div id="price-input">
                                        <div id="dollar-sign">$</div>
                                        <input 
                                        type="number" 
                                        id="listing-price" 
                                        value={listingPrice}
                                        onChange={e => setListingPrice(e.target.value)}
                                        />
                                    </div>
                                    <div 
                                    id="control-button" 
                                    onClick={() => increment(setListingPrice)}
                                    style={listingPrice<10000?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >+</div>
                                </div>
                            </div>                          
                            {error.listingPrice && (<div id="error-message"><span>!</span>{error.listingPrice}</div>)}
                        </div>

                        <div id="price-content-innerContainer-id">
                            <div className="price-section">  
                                <div className="price-form-calendar">
                                    <p style={{color: 'rgb(113,113,113)'}}>Please select a date range for your property, your property will be listed at the current set price during this time frame </p>
                                    <DateRangePicker 
                                        startDate={startingDate}
                                        startDateId="your_unique_start_date_id"
                                        endDate={endingDate}
                                        endDateId="your_unique_start_date_id"
                                        onDatesChange={({ startDate, endDate }) => {
                                            setStartingDate(startDate);
                                            setEndingDate(endDate)
                                        }} 
                                        focusedInput={focusedInput}
                                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                        // withPortal 
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="price-content-innerContainer-id">                       
                            <div className="price-section">                                           
                                <label htmlFor="service-fee">Service fee</label>
                                <div className="price-setting-container">
                                    <div 
                                    id="control-button"
                                    onClick={() => decrement(setServiceFee)}
                                    style={serviceFee>0?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >-</div>
                                    <div id="price-input">
                                        <div id="dollar-sign">$</div>
                                        <input 
                                            type="number" 
                                            id="service-fee" 
                                            value={serviceFee}
                                            onChange={e => setServiceFee(e.target.value)}
                                        />
                                    </div>
                                    <div 
                                    id="control-button"
                                    onClick={() => increment(setServiceFee)}
                                    style={serviceFee<10000?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >+</div>
                                </div>
                            </div>
                            {error.serviceFee && (<div id="error-message"><span>!</span>{error.serviceFee}</div>)}
                        </div>

                        <div id="price-content-innerContainer-id">
                            <div className="price-section">  
                                <label htmlFor="cleaning-fee">Cleaning fee</label>
                                <div className="price-setting-container">
                                    <div 
                                    id="control-button"
                                    onClick={() => decrement(setCleaningFee)}
                                    style={cleaningFee>0?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >-</div>
                                    <div id="price-input">
                                        <div id="dollar-sign">$</div>
                                        <input 
                                            type="number" 
                                            id="cleaning-fee" 
                                            value={cleaningFee}
                                            onChange={e => setCleaningFee(e.target.value)}
                                        />
                                    </div>
                                    <div 
                                    id="control-button"
                                    onClick={() => increment(setCleaningFee)}
                                    style={cleaningFee<10000?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >+</div>
                                </div>
                            </div>
                            {error.cleaningFee && (<div id="error-message"><span>!</span>{error.cleaningFee}</div>)}
                        </div>

                    </div>
                </div>
                <div className="button-container">
                    <div className="button-container-div">
                        <Link to="/createListing/descriptionForm" style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}>Back</Link>
                        <Link 
                            className={(Object.values(error).length || startDateError || endDateError) ? "edit-photo-modal-save-button-disabled" :"edit-photo-modal-save-button"}
                            style={{textDecoration:'none'}}
                            to="/createListing/descriptionForm"
                            onClick={handleNext}
                        >
                            <div>Next</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}