import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useListing } from "../../context/ListingContext";
import './createListing.css';

export default function ListingPriceForm() {
    const {listingPrice, setListingPrice, serviceFee, setServiceFee, cleaningFee, setCleaningFee} = useListing();
    const [error, setError] = useState({});

    useEffect(() => {
        setListingPrice(+localStorage.getItem("listing price"));
        setServiceFee(+localStorage.getItem("service fee"));
        setCleaningFee(+localStorage.getItem("cleanning fee"))
    },[]);

    useEffect(() => {
        localStorage.setItem("listing price", listingPrice);
        localStorage.setItem("service fee", serviceFee);
        localStorage.setItem("cleanning fee", cleaningFee);
    },[listingPrice, serviceFee, cleaningFee]);

    useEffect(() => {
        let errorMsg = {}
        if(listingPrice < 10 || listingPrice > 10000) errorMsg['listingPrice']="Please enter a base price between $10 and $10,000.";
        setError(errorMsg);
        if(serviceFee < 10) errorMsg['serviceFee'] = "Service fee must be greater than $10";
        if(cleaningFee < 10) errorMsg['cleaningFee'] = "Cleaning fee must be greater than $10";
        setError(errorMsg)
    },[listingPrice, serviceFee, cleaningFee ])

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
                        <div>
                            
                                <label htmlFor="listing-price">Price per night</label>
                                <div className="price-setting-container">
                                    <div id="control-button"
                                    onClick={() => decrement(setListingPrice)}>-</div>
                                    <div id="dollar-sign">$</div>
                                    <input 
                                    type="number" 
                                    id="listing-price" 
                                    value={listingPrice}
                                    onChange={e => setListingPrice(e.target.value)}
                                    />
                                    <div id="control-button" 
                                    onClick={() => increment(setListingPrice)}>+</div>
                                </div>
                          
                            {error.listingPrice && (<div id="error-message">{error.listingPrice}</div>)}
                        </div>

                        <div>
                            <label htmlFor="service-fee">Service fee</label>
                            <div className="price-setting-container">
                                <div id="control-button"
                                onClick={() => decrement(setServiceFee)}>-</div>
                                <div id="dollar-sign">$</div>
                                <input 
                                    type="number" 
                                    id="service-fee" 
                                    value={serviceFee}
                                    onChange={e => setServiceFee(e.target.value)}
                                />
                                <div id="control-button"
                                onClick={() => increment(setServiceFee)}>+</div>
                            </div>
                        </div>
                            {error.serviceFee && (<div>{error.serviceFee}</div>)}
                        <div>
                            <label htmlFor="cleaning-fee">Cleaning fee</label>
                            <div className="price-setting-container">
                                <div id="control-button"
                                onClick={() => decrement(setCleaningFee)}>-</div>
                                <div id="dollar-sign">$</div>
                                <input 
                                    type="number" 
                                    id="cleaning-fee" 
                                    value={cleaningFee}
                                    onChange={e => setCleaningFee(e.target.value)}
                                />
                                <div id="control-button"
                                onClick={() => increment(setCleaningFee)}
                                >+</div>
                            </div>
                        </div>
                            {error.cleaningFee && (<div>{error.cleaningFee}</div>)}
                    </div>
                </div>
                <div className="button-container">
                    <div className="button-container-div">
                        <Link to="/createListing/descriptionForm" style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}>Back</Link>
                        <Link 
                            className={!Object.values(error).length ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                            style={{textDecoration:'none'}}
                            to="/createListing/descriptionForm"

                        >
                            <div>Next</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}