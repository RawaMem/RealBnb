import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function DescriptionForm() {
    const [description, setDescription] = useState(localStorage.getItem("listing description") || '');
    const [descriptionLength, setDescriptionLength] = useState(0);
        
    const handlePageChange = () => localStorage.setItem("listing description", description);

    useEffect(() => {
        setDescriptionLength(description.length);
    },[description]);

    return (
        <div className="form-container">
            <section className="video-section-container">
                <div className="video-description">Now, let's describe your place</div>
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
                    <source src="https://a0.muscache.com/v/55/86/558653ec-da4e-5148-b0e2-828b7a691e86/558653ecda4e5148b0e2828b7a691e86_4000k_1.mp4" />
                </video>
            </section>
            <section className="title-form-container">
                <div className="title-content">
                    <div className="title-content-div">
                        <h5 style={{fontSize:'22px'}}>Create your description</h5>
                        <textarea 
                            maxLength="500"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                        <div style={{color:'rgb(118,118,118)', fontWeight:'600'}}>{descriptionLength}/500</div>
                    </div>
                </div>
                <div className="button-container">
                    <div className="button-container-div">
                        <Link 
                            to="/createListing/titleForm" 
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            onClick={handlePageChange}
                        >Back</Link>
                        <Link 
                            className={description.length>0 ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                            style={{textDecoration:'none'}}
                            to="/createListing/listingPriceForm"
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