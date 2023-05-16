import { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import "./editListing.css";

function AddMoreImagesForm({setAddedImages,addedImages,setShowAddImageModal, imgUrl, setImgUrl}) {
    
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
            // setDroppedFiles([...droppedFiles]);

            // multiImages is used to update s3 bucket, the images updated has to be File type.         
            setAddedImages(prev => [...prev, ...droppedFiles]);
            // droppedFiles is an array of objects of File data type, the blob type url of each image url is stored in the preview key of each object.
            const droppedFileUrl = droppedFiles.map(file => file.preview);

            // console.log("droppedFiles", droppedFiles)
            setImgUrl(prev => [...prev, ...droppedFileUrl]);
            
            // setDragZone(false);
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
    console.log("addedImages", addedImages)


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
            >
                <div 
                className="edit-listing-drag-drop-zone"
                >                     
                     <div className='edit-listing-drop-zone'
                    {...getRootProps()} 
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
                <div onClick={() => setShowAddImageModal(false)}>Cancel</div>
            </div>

        </div>
    );
};

export default AddMoreImagesForm;