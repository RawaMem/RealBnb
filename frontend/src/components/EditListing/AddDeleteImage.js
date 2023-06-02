import { useState } from "react";
import { Modal } from "../../context/Modal";
import ManageImage from "./ManageImage";
import AddMoreImagesForm from "./ImagesModal";

export default function AddDeleteImages({imageArr, setImageArr, removedImageIds, setRemovedImageIds, addedImages, setAddedImages, setMultiImages, previewImageUrl, setPreviewImageUrl}) {
    
    const [showAddImageModal, setShowAddImageModal] = useState(false);

    const [imgUrl, setImgUrl] = useState([]);


    const handleRemovingImages = (idx, imageId, imageUrl) => {
        setImageArr(prev => {
            const newImageArr = [...prev];
            newImageArr.splice(idx, 1);
            return newImageArr;
        });
        // if image is stored in database
        if(imageId !== 0) setRemovedImageIds(prev => [...prev, imageId])
        // if image is not stored in database, then it must be newly added image in the edit form.
        else setAddedImages(prev => {
            const newRef = [...prev]
            const newAddedImages = newRef.filter(file => file.preview !== imageUrl);
            return newAddedImages;
        });

        if(imageUrl === previewImageUrl) setPreviewImageUrl(null);
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
                    setImageArr={setImageArr}
                />
            </Modal>
        );
    };

    return (
        <div className="edit-image-inner-container">
            <div className="edit-image-2nd-inner-container">   
                {imageArr.map((img, idx) => (
                    <div key={img+idx} className="edit-image-card-container">     
                        <ManageImage 
                        previewImageUrl={previewImageUrl}
                        setPreviewImageUrl={setPreviewImageUrl}
                        image={img}
                        imageIdx={idx}
                        handleRemovingImages={handleRemovingImages}
                        setAddedImages={setAddedImages}
                        /> 
                        {previewImageUrl === img.url && <div className="cover-photo-logo">Cover Photo</div>}     
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