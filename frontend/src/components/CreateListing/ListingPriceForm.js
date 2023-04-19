import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import moment from 'moment';
import './createListing.css';

export default function ListingPriceForm() {

    const getInitalPrice = (localStorageKey, amount) => {
        const val = localStorage.getItem(localStorageKey);
        if (val) return +val;
        else return amount;
    };

    const getInitalDate = (localStorageKey) => {
        const dateStr = localStorage.getItem(localStorageKey);
        if(dateStr) return moment.utc(dateStr);
        else return null;
    };

    const [serviceFee, setServiceFee] = useState(getInitalPrice("service fee", 1));
    const [cleaningFee, setCleaningFee] = useState(getInitalPrice("cleanning fee", 1));

    const [error, setError] = useState({});
    const [startingDate, setStartingDate] = useState(getInitalDate('startingDate'));
    const [endingDate, setEndingDate] = useState(getInitalDate("endingDate"));;

    const [focusedInput, setFocusedInput] = useState(null);
    const [listingPrice, setListingPrice] = useState(getInitalPrice("listing price", 10));
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
    
    const handlePageChange = () => {
        function convertDateObjToStr(date) {
            return date.toISOString().slice(0, 19).replace('T', ' ')
        };
        localStorage.setItem("listing price", listingPrice);
        localStorage.setItem("service fee", serviceFee);
        localStorage.setItem("cleanning fee", cleaningFee);
        localStorage.setItem("startingDate", convertDateObjToStr(startingDate));
        localStorage.setItem("endingDate", convertDateObjToStr(endingDate));
    };

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

    function increment(setter, num1, num2) {
        return setter(prev => {
            if(prev + num1 <= num2) return +prev+num1;
            else return prev
        });
    };

    function decrement(setter, num1, num2) {
        return setter (prev => {
            if(prev - num1 >= num2) return +prev-num1;
            else return prev;
        });
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
                                    onClick={() => decrement(setListingPrice, 5, 1)}
                                    style={listingPrice>10?{cursor:'pointer'}:{cursor:'not-allowed'}}
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
                                    onClick={() => increment(setListingPrice, 5, 10000)}
                                    style={listingPrice+5<10000?{cursor:'pointer'}:{cursor:'not-allowed'}}
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
                                    onClick={() => decrement(setServiceFee, 1, 1)}
                                    style={serviceFee>1?{cursor:'pointer'}:{cursor:'not-allowed'}}
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
                                    onClick={() => increment(setServiceFee, 1, 1000)}
                                    style={serviceFee<1000?{cursor:'pointer'}:{cursor:'not-allowed'}}
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
                                    onClick={() => decrement(setCleaningFee, 1, 1)}
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
                                    onClick={() => increment(setCleaningFee, 1, 1000)}
                                    style={cleaningFee<1000?{cursor:'pointer'}:{cursor:'not-allowed'}}
                                    >+</div>
                                </div>
                            </div>
                            {error.cleaningFee && (<div id="error-message"><span>!</span>{error.cleaningFee}</div>)}
                        </div>

                    </div>
                </div>
                <div className="button-container">
                    <div className="button-container-div">
                        <Link 
                            to="/createListing/descriptionForm" 
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            onClick={handlePageChange}
                        >Back</Link>
                        <Link 
                            className={(Object.values(error).length || startDateError || endDateError) ? "edit-photo-modal-save-button-disabled" :"edit-photo-modal-save-button"}
                            style={{textDecoration:'none'}}
                            to="/createListing/images"
                            onClick={handlePageChange}
                        >
                            <div>Next</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}