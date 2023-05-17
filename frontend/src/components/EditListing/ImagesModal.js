import { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import ConfirmAndNextBtn from '../../ui/Buttons/ConfirmAndNext';
import ClearBackgroundBtn from '../../ui/Buttons/ClearBackground';
import "./editListing.css";

function AddMoreImagesForm({setAddedImages,addedImages,setShowAddImageModal, imgUrl, setImgUrl, setImageArr}) {


    const [dropZone, setDropZone] = useState(false);
    
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
        
            setAddedImages(prev => [...prev, ...droppedFiles]);
            // droppedFiles is an array of objects of File data type, the blob type url of each image url is stored in the preview key of each object.
            const droppedFileUrl = droppedFiles.map(file => file.preview);

            setImgUrl(prev => [...prev, ...droppedFileUrl]);
            
            setDropZone(false);
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
            setImgUrl(prev => [...prev, url])  
            inputFile.preview = url;
            setAddedImages(prev => [...prev, inputFile]);
        });
        };
    };


    const buttonEvent = () => {
        const fileElem = document.getElementById("fileElem");
        fileElem.click();
    };

    const handleDelete = (url, idx) => {
        setImgUrl(prev => {
            const newImageArr = [...prev];
            newImageArr.splice(idx, 1);
            return newImageArr;
        });

        setAddedImages(prev => {
            const newAddedImageArr = prev.filter(file => file.preview !== url);
            return newAddedImageArr;
        });
    };

    const handleSave = () => {
        setImageArr(prev => {
            const newImageArr = [...prev];
            const addUrlKey = [];
            imgUrl.forEach(url => addUrlKey.push({url, id:0}));
            return [...newImageArr, ...addUrlKey];
        });

        setImgUrl([]);
    };


    return(
        <div className="edit-listing-add-images-container">

            <div className="edit-listing-add-image-title">
                <h3>Drag and drop more images for your listing</h3>
                <div id="fileSelect" onClick={buttonEvent} >
                    <span className="material-symbols-outlined">
                        file_upload
                    </span>
                    <span className="upload-button">Upload</span>
                </div>
                <input type="file" multiple  {...getInputProps()} onChange={updateFiles} style={{display:'none'}} id="fileElem" />
            </div>

            <div 
                className="edit-listing-drag-drop-zone-container"
                onDragEnter={e => {
                    setDropZone(true)
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >   
            {dropZone && ( <div 
                id="edit-listing-image-drop-zone"
                {...getRootProps({ className: 'dropzone' })} 
                onDragOver={e => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onDragLeave={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDropZone(false);
                }}
                >Drop Files Here</div> ) }

                <div 
                className="edit-listing-drag-drop-zone"
                >                     
                     <div className='edit-listing-drop-zone'
                    >   
                        {imgUrl.map((url, idx) => (
                            <div key={url+idx} className="edit-image-card-container">
                                <div 
                                className="edit-image-card-delete"
                                onClick={() => handleDelete(url, idx)}
                                >-</div>    
                                <img src={url} className='edited-image' />
                            </div>
                        ))}
                    </div>
                    
                </div>

            </div>

            <div className="edit-listing-button-container">
                <div className='edit-listing-button-inner-container'>
                    <ClearBackgroundBtn btnText={"Cancel"} onClick={() => setShowAddImageModal(false)} />
                    <ConfirmAndNextBtn textColor={"white"} btnText={"Confirm"} disabled={false} onClick={() => {
                        handleSave();
                        setShowAddImageModal(false);
                    }} />
                </div>
            </div>

        </div>
    );
};

export default AddMoreImagesForm;