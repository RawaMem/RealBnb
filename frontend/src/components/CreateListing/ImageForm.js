import { useEffect, useState } from "react";
import { NavLink,Link } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import './createListing.css';
import ImageDropDown from "./ImageDropDown";
import EditPhotoForm from "./EditPhotoForm";
import { Modal } from "../../context/Modal";
import ConfirmForm from "./ConfirmForm";

export default function ImageForm() {

    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    const [imgUrl, setImgUrl] = useState(''); 
    const [multiImages, setMultiImages] = useState([]);

    const [dragZone, setDragZone] = useState(false);
    const [droppedFile, setDroppedFile] = useState([]);
    const [imageDrag, setImageDrag] = useState(false);
    const [dragStartIndex, setDragStartIndex] = useState(0);
    const [dragEndIndex, setDragEndIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConformationForm, setShowConformationForm] = useState(false);
    const [editedPhotoUrl, setEditedPhotoUrl] = useState('');
    const [imageDescription, setImageDescription] = useState({});
    // const [errors, setErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    
    const handleDeleteImage = url => {

        const urlIdx = imgUrl.indexOf(url);
        const newImageUrlArr = [...imgUrl];
        newImageUrlArr.splice(urlIdx, 1);
        setImgUrl(newImageUrlArr);

        const findObj = multiImages.find(file => file.preview === url);
        const removeFromMultiImageIdx = multiImages.indexOf(findObj);
        const copyMultiImages = [...multiImages];
        copyMultiImages.splice(removeFromMultiImageIdx, 1);
        setMultiImages(copyMultiImages);
    };

// reorder function is used to order imageUrl array, so we can display reordered result on the DOM. 
    const reorder = (arr, startIndex, endIndex) => {
        const reorderedImageUrl = Array.from(arr);
        [reorderedImageUrl[startIndex], reorderedImageUrl[endIndex]] = [reorderedImageUrl[endIndex], reorderedImageUrl[startIndex]];     
        setImgUrl(reorderedImageUrl);
    };
    
    const handleReorderMultiImages = () => {
        const reorderedMultiImages = [];
        for(let url of imgUrl) {
            for(let file of multiImages) {
                const {preview} = file;
                if(preview === url) {
                    reorderedMultiImages.push(file);
                };
            };
        };
        setMultiImages(reorderedMultiImages);
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

            // multiImages is used to update s3 bucket, the images updated has to be File type.         
            setMultiImages([...multiImages, ...droppedFiles]);

            // droppedFiles is an array of objects of File data type, the blob type url of each image url is stored in the preview key of each object.
            const droppedFileUrl = droppedFiles.map(file => file.preview);
            setImgUrl([...imgUrl, ...droppedFileUrl]);
            setDragZone(false);
        },
    });

      //for multiple file upload
    const updateFiles = e => {
        const files = e.target.files;
        const inputFile = files[0];
        const fr = new FileReader();
        if(e.target?.files[0] instanceof Blob) {
            fr.readAsDataURL(e.target?.files[0]);
            fr.addEventListener('load', () => {
                const url = fr.result;              
                setImgUrl([...imgUrl, url])  
                // File object returned from input event target doesn't have a url, set the newly generated image url to the File object, so all File object stored in multiImages state have a key of preview and value of image url, this image url is used to reorder the files stored in multiImages state after user reordered images.
                inputFile.preview = url;
                setMultiImages([...multiImages, inputFile]);
            });
        };
    };

    const buttonEvent = () => {
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
                            key={url}     
                            draggable='true' 
                            onDragStart={() => setImageDrag(true)}
                            onDragOver={e => 
                                {e.preventDefault();
                                setDragEndIndex(idx);
                                }}
                            onDrop={e => {
                                e.preventDefault();
                                reorder(imgUrl, dragStartIndex, dragEndIndex);
                            }}
                            onDragEnd={ e => {
                                e.preventDefault()
                                handleReorderMultiImages();
                                setImageDrag(false)
                                }
                            }
                        >   
         
                                <ImageDropDown 
                                    handleDeleteImage={handleDeleteImage} 
                                    url={url} 
                                    setShowEditModal={setShowEditModal}
                                    setEditedPhotoUrl={setEditedPhotoUrl}
                                    previewImageUrl={previewImageUrl}
                                    setPreviewImageUrl={setPreviewImageUrl}
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
                handleDeleteImage={handleDeleteImage}setImageDescription={setImageDescription}
                imageDescription={imageDescription}
                />
            </Modal>
        );
    };

    function showConformationModal() {
        return (
            <Modal onClose={() => setShowConformationForm(false)}>
                <ConfirmForm 
                    previewImageUrl={previewImageUrl}
                    multiImages={multiImages}
                    setShowConformationForm={setShowConformationForm}
                    imageDescription={imageDescription}
                />
            </Modal>
        );
    };

    function handleClickHostBtn() {
        const imageFormError = {};

        if(!previewImageUrl) imageFormError['previewImage']="Please select a preview image";

        if(multiImages.length < 5) imageFormError['imageQyt']="Please add at least 5 images for your property";

        if(Object.values(imageFormError).length) {
            setErrors(imageFormError);
            setHasSubmitted(true)
            return;
        } else {
            setShowConformationForm(true);
        };
    };

    useEffect(() => {
        if (hasSubmitted) {
            const newErrors = { ...errors };
            if (previewImageUrl) delete newErrors['previewImage'];
            if (multiImages.length >= 5) delete newErrors['imageQyt'];
            setErrors(newErrors);
        };
    }, [previewImageUrl, multiImages, hasSubmitted]);

    return (
        <>
            <div className="form-container">
                <section className="video-section-container">
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
                className="title-form-container"   
                id="title-form-container"
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
                                    <span className="material-symbols-outlined">
                                        file_upload
                                    </span>
                                    <span className="upload-button">Upload</span>
                                </div>
                            </div>
                            {Object.values(errors).length > 0 && (Object.values(errors).map(e => (
                                <div key={e}>{e}</div>
                            )))}
                        </div>
                        {pictureZone()}
                        {showConformationForm && showConformationModal()}
                    </div>
                    <div className='button-layout'>
                        <div className="button-container-div">
                            <NavLink
                                style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                                to='/createListing/listingPriceForm'
                                >
                                    Back
                            </NavLink>
                            <div>
                                <div
                                    className={imgUrl.length ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                                    onClick={handleClickHostBtn}
                                    >
                                        <div>Host</div>
                                        
                                </div>
                            </div> 
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
};