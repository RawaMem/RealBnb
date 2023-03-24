import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TitleForm() {
    const [name, setName] = useState(localStorage.getItem('listing_name') || '');// 
    const [nameLength, setNameLength] = useState(0);
    const bedroomQty = localStorage.getItem('bedrooms');
    const city = localStorage.getItem('city');

    const handlePageChange = () => {
        localStorage.setItem('listing_name', name);
    };

    useEffect(() => {
        setNameLength(name.length);
    },[name]);

    return (
        <div className="form-container">
            <section className="video-section-container">
                <div className="video-description">Let's give your place a name</div>
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
                    <source src="https://a0.muscache.com/v/33/20/3320c65c-5167-5999-ad8b-89c6c0c27b53/3320c65c51675999ad8b89c6c0c27b53_4000k_1.mp4" type="video/mp4" />
                </video>
            </section>
            <section className="title-form-container">
                <div className="title-content">
                    <div className="title-content-div">
                        <h5 style={{fontSize:'22px'}}>Create your title</h5>
                        <div style={{color:'rgb(118,118,118)'}}>Your listing title should highlight what makes your place special.</div>
                        <textarea 
                            placeHolder={`Cheerful ${bedroomQty}-bedroom home in ${city}`}
                            maxLength="50"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <div style={{color:'rgb(118,118,118)', fontWeight:'600'}}>{nameLength}/50</div>
                    </div>
                </div>
                <div className="button-container">
                    <div className="button-container-div">
                        <Link 
                            to="/createListing-categoryForm" 
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            onClick={handlePageChange}
                        >Back</Link>
                        <Link 
                            className={name.length>0 ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                            style={{textDecoration:'none'}}
                            onClick={handlePageChange}
                            to="/createListing/descriptionForm"
                        >
                            <div>Next</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
};