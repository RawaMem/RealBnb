import { useState } from "react";
import { NavLink } from "react-router-dom"
import { useListing } from "../../context/ListingContext"

export default function ImageForm() {
    const {multiImages, setMultiImages, imageDescription, setImageDescription} = useListing();
    const [imgUrl, setImgUrl] = useState([]); 
    
      //for multiple file upload
    const updateFiles = e => {
        const files = e.target.files;
        setMultiImages([...multiImages, files]);
        const fr = new FileReader();
        // e.target.files structure: {0: File, length: 1}
        fr.readAsDataURL(e.target.files[0]);
        fr.addEventListener('load', () => {
            const url = fr.result;
            setImgUrl([...imgUrl, url])
        });
    };

    // console.log('this is multiImages', multiImages); 
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
                            <label>
                                upload
                                <input type="file" multiple accepts="image/*" onChange={updateFiles} />
                            </label>
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