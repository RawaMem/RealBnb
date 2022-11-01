import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useListing } from "../../context/ListingContext"
import './createListing.css';
import ImageDropDown from "./ImageDropDown";
import EditPhotoForm from "./EditPhotoForm";
import { Modal } from "../../context/Modal";
// import { getListingImagesAction } from "../../store/listings";

export default function ImageForm() {
    const {imgUrl, setImgUrl, previewImageUrl, setPreviewImageUrl} = useListing();
    const dispatch = useDispatch();

    const [dragZone, setDragZone] = useState(false);
    const [droppedFile, setDroppedFile] = useState([]);
    const [imageDrag, setImageDrag] = useState(false);
    const [dragStartIndex, setDragStartIndex] = useState(0);
    const [dragEndIndex, setDragEndIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPhotoUrl, setEditedPhotoUrl] = useState('');
    const [multiImages, setMultiImages] = useState([]);//

    // useEffect(() => {
    //     console.log('dispatched')
    //     dispatch(getListingImagesAction(multiImages))
    // },[multiImages]);
        
    // const multiImageFiles = useSelector(state => state.listings);

    useEffect(() => {
        const imagesLocalStorage = localStorage.getItem('imgUrls').split(',');
        setImgUrl(imagesLocalStorage.length>1 ? imagesLocalStorage : []);
        setPreviewImageUrl(localStorage.getItem('previewImageUrl').length ? localStorage.getItem('previewImageUrl') : '');
        // if(multiImageFiles) setMultiImages(multiImageFiles);
        // console.log('this is multiImageFiles from component', multiImageFiles);
    },[])
    
    useEffect(() => {
        localStorage.setItem('imgUrls', imgUrl);
        localStorage.setItem('previewImageUrl', previewImageUrl);
        // dispatch(getListingImagesAction(multiImages))
    },[imgUrl.length, previewImageUrl, multiImages])


    
    console.log('multiImages=======> component', multiImages)

    const handleDeleteImage = url => {
        const urlIdx = imgUrl.indexOf(url);
        const newState = [...imgUrl];
        newState.splice(urlIdx, 1);
        setImgUrl(newState);

        const dropFile = droppedFile.find(file => file.preview === url )
        const fileIdx = droppedFile.indexOf(dropFile);
        const newDroppedFile = [...droppedFile];
        newDroppedFile.splice(fileIdx, 1);
        setDroppedFile(newDroppedFile)
        const removeFromMultiImageIdx = multiImages.indexOf(dropFile);
        const copyMultiImages = [...multiImages];
        copyMultiImages.splice(removeFromMultiImageIdx, 1);
        setMultiImages(copyMultiImages);
    };

    const reorder = (arr, startIndex, endIndex) => {
        const reorderedImageUrl = Array.from(arr);
        [reorderedImageUrl[startIndex], reorderedImageUrl[endIndex]] = [reorderedImageUrl[endIndex], reorderedImageUrl[startIndex]]      
        setImgUrl(reorderedImageUrl);

        // reorder multiImages
        const copyMultiImages = [...multiImages];
        copyMultiImages.sort((file1, file2) => {
            const url1 = file1.preview;
            const url2 = file2.preview;
            return imgUrl.indexOf(url1) - imgUrl.indexOf(url2);
        })
        setMultiImages(copyMultiImages)
    };

    const {
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            const droppedFiles = acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }));
            setDroppedFile([...droppedFiles]);         
            setMultiImages([...multiImages, ...droppedFiles]);
            const droppedFileUrl = droppedFiles.map(file => file.preview);
            setImgUrl([...imgUrl, ...droppedFileUrl]);
            setDragZone(false);
        }
    });

      //for multiple file upload
    const updateFiles = e => {
        const files = e.target.files;

        setMultiImages([...multiImages, files[0]]);
        const fr = new FileReader();
        if(e.target?.files[0] instanceof Blob) {
            fr.readAsDataURL(e.target?.files[0]);
            fr.addEventListener('load', () => {
                const url = fr.result;                
                setImgUrl([...imgUrl, url])                
            });
        }
    };


    const buttonEvent = e => {
        const fileElem = document.getElementById("fileElem");
        fileElem.click();
    };

    function pictureZone() {
        return (
            <div className="image-form-image-section-container-images">
                    {imgUrl.length>0 && imgUrl.map((url, idx) => (
                        <div 
                            className="image-section-layout" 
                            id="dragableDiv"
                            key={idx}     
                            draggable='true' 
                            onDragStart={() => setImageDrag(true)}
                            onDragOver={e => 
                                {e.preventDefault();
                                setDragEndIndex(idx);
                                }}
                            onDrop={e => {
                                e.preventDefault();
                                reorder(imgUrl, dragStartIndex, dragEndIndex)
                            }}
                            onDragEnd={ e => {
                                e.preventDefault()
                                setImageDrag(false)
                                }
                            }
                        >   
         
                                <ImageDropDown 
                                handleDeleteImage={handleDeleteImage} 
                                url={url} 
                                setShowEditModal={setShowEditModal}
                                setEditedPhotoUrl={setEditedPhotoUrl}
                                />
                            {previewImageUrl === url && <div className="cover-photo-logo"> Cover Photo </div> }                  
                            <img 
                                src={url} 
                                className="preview-images" 
                                style={{height: '200px', width:'200px', borderRadius:'3px',
                                cursor: 'pointer',
                                }}
                                draggable='true' 
                                onDragStart={() => {                    
                                    setDragStartIndex(idx)
                                }}
                            /> 
                            {showEditModal && showEditImageModal(editedPhotoUrl)}
                        </div>                  
                    ))}    
            </div>
        );
    };

    function showEditImageModal(imgUrl) {
        return (
            <Modal onClose={() => setShowEditModal(false)}>
                <EditPhotoForm 
                setShowEditModal={setShowEditModal} 
                url={imgUrl}
                handleDeleteImage={handleDeleteImage}
                />
            </Modal>
        );
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
                    <span className="video-caption">Next, let's add some photos of your place</span>
                </section>

                <section 
                className="grid-right-container-image-form"   
                onDragEnter={e => {
                    imageDrag ? setDragZone(false) : setDragZone(true)
                    e.stopPropagation()
                    e.preventDefault()
                }
                }
                >
                    <div 
                    className="image-form-image-section-container"
                    >
                        {dragZone && ( <div 
                        id="image-drop-zone"
                        {...getRootProps({ className: 'dropzone' })} 
                        onDragOver={e => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        onDragLeave={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            setDragZone(false);
                        }}
                        >Drop Files Here</div> ) }
                        <div className="image-form-image-section-container-upper">
                            <div>
                                <h3>Ta-da! How does this look?</h3>
                                <span>Drag to reorder</span>
                            </div>
                            <div>
                                <input type="file" multiple  {...getInputProps()} onChange={updateFiles} style={{display:'none'}} id="fileElem" />
                                <div id="fileSelect" onClick={buttonEvent} >
                                    <span class="material-symbols-outlined">
                                        file_upload
                                    </span>
                                    <span class="upload-button">Upload</span>
                                </div>
                            </div>
                        </div>
                        {pictureZone()}
                    </div>
                    <div className='button-layout'>
                        <NavLink
                            style={{ textDecoration:'none', color: 'black', fontSize: '20px',cursor:'pointer'}}
                            to='/createListing-categoryForm'
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
                                to='/createListing/titleForm'
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