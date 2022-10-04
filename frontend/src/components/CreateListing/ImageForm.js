import { useState } from "react";
import { NavLink } from "react-router-dom"
import { useListing } from "../../context/ListingContext"
import './createListing.css';


export default function ImageForm() {
    const {imgUrl, setImgUrl,multiImages, setMultiImages, imageDescription, setImageDescription} = useListing();
    const [errors, setErrors] = useState({imageUpload:''})
      //for multiple file upload
    const updateFiles = e => {
        const files = e.target.files;
        setMultiImages([...multiImages, files]);
        const fr = new FileReader();
        // e.target.files structure: {0: File, length: 1}
        if(e.target?.files[0] instanceof Blob) {
            fr.readAsDataURL(e.target?.files[0]);
            fr.addEventListener('load', () => {
                const url = fr.result;
                if(imgUrl.indexOf(url) === -1) {
                    setImgUrl([...imgUrl, url])
                } else {
                    setErrors(prev => ({...prev, imageUpload:'photo already exists, please select another one.'}))
                };
            });
        }
    };

    const buttonEvent = e => {
        const fileSelect = document.getElementById("fileSelect");
        const fileElem = document.getElementById("fileElem");
        fileElem.click();
    };



    return (
        <>
            <div className="image-form-container">
                <section className="video-section">
                    <video 
                        autoPlay 
                        controls
                        muted 
                        preload='auto' 
                        controlsList="play nodownload noplaybackrate"
                        disablePictureInPicture
                        playsInline
                        crossOrigin="anonymous"
                        style = {{ width:'100%', height: 'auto'}}
                    >
                        <source src="https://a0.muscache.com/v/d6/12/d6120feb-75fc-52dd-b5bb-5755913fb756/d6120feb75fc52ddb5bb5755913fb756_4000k_1.mp4" type="video/mp4" />
                    </video>
                </section>

                <section className="grid-right-container-image-form">
                    <div className="image-form-image-section-container">
                        <div className="image-form-image-section-container-upper">
                            <div>
                                <h3>Ta-da! How does this look?</h3>
                                <span>Drag to reorder</span>
                            </div>
                            <div>
                                <input type="file" multiple accepts="image/*" onChange={updateFiles} style={{display:'none'}} id="fileElem" />

                                <div id="fileSelect" onClick={buttonEvent} >
                                    <span class="material-symbols-outlined">
                                        file_upload
                                    </span>
                                    <span class="upload-button">Upload</span>
                                </div>
                            </div>
                        </div>

                        <div className="image-form-image-section-container-images" style={{overflow:'scroll'}}>
                            {imgUrl.length && imgUrl.map((url, idx) => (
                                <img key={idx} src={url} className="preview-images" style={{height: '200px', width:'180px' }}/>
                            ))}
                        </div>
                    </div>
                    <div className='button-layout'>
                        <NavLink
                            style={{ textDecoration:'none', color: 'black', fontSize: '20px',cursor:'pointer'}}
                            to='/createListing-amenitiForm'
                            >
                                Back
                        </NavLink>
                        <div>
                            <NavLink
                                style={{ 
                                    textDecoration:'none',
                                    color: 'white',
                                    cursor:'pointer',
                                    width:'100px',
                                    height:'50px',
                                    background:'black',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'15px',
                                    cursor:'pointer'
                                }}
                                to='/createListing/images'
                                >
                                    Next
                                </NavLink>
                            </div> 
                    </div>
                </section>

            </div>
        </>
    )
};