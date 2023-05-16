import { useState } from "react";
import { Modal } from "../../context/Modal";
import AddMoreImagesForm from "./ImagesModal";

export default function AddDeleteImages({imageArr, setImageArr, removedImageIds, setRemovedImageIds, addedImages, setAddedImages, setMultiImages}) {

    const [showAddImageModal, setShowAddImageModal] = useState(false);

    const [imgUrl, setImgUrl] = useState([]);


    const handleRemovingImages = (idx, imageId) => {
        setImageArr(prev => {
            const newImageArr = [...prev];
            newImageArr.splice(idx, 1);
            return newImageArr;
        });

        setRemovedImageIds(prev => [...prev, imageId])
    };

    const showAddMoreImageModal = () => {
        return (
            <Modal onClick={() => setShowAddImageModal(false)}>
                <AddMoreImagesForm 
                    setAddedImages={setAddedImages}
                    addedImages={addedImages}
                    setShowAddImageModal={setShowAddImageModal}
                    setMultiImages={setMultiImages}
                    imgUrl={imgUrl}
                    setImgUrl={setImgUrl}
                />
            </Modal>
        );
    };

    return (
        <div className="edit-image-inner-container">
            <div className="edit-image-2nd-inner-container">    
                {imageArr.map((img, idx) => (
                    <div key={img+idx} className="edit-image-card-container">     
                        <div 
                        className="edit-image-card-delete"
                        onClick={() => handleRemovingImages(idx, img.id)}
                        >-</div>        
                        <img src={img.url} className="edited-image" />               
                    </div>
                ))}
        
                <div className="edit-image-add-icon-container" onClick={() => setShowAddImageModal(true)}>
                    <span 
                        id="material-symbols-outlined"
                        className="material-symbols-outlined">
                        library_add
                    </span>
                </div>
            </div>

            {showAddImageModal && showAddMoreImageModal()}
        </div>
    );
};