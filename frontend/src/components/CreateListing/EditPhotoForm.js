import { useEffect, useState } from "react";
import { useListing } from "../../context/ListingContext";
import './createListing.css';

export default function EditPhotoForm({setShowEditModal, url, handleDeleteImage}) {
    const {imageDescription, setImageDescription} = useListing();
    const [caption, setCaption] = useState('');
    console.log("imageDescription", imageDescription)
    console.log("caption", caption)

    useEffect(() => {
       setCaption(localStorage.getItem('image caption'))
    },[]);

    useEffect(() => {
        localStorage.setItem('image caption', caption);
    },[caption]);

    function handleDelete() {
        handleDeleteImage(url);
        if (caption.length) setCaption('')
        setShowEditModal(false);
    };

    function handleSave() {
        if(caption.length) {
            setImageDescription(prev => {
            const updateImageDescription = {...prev};
            updateImageDescription[url] = caption;
            return updateImageDescription;
            })
            setShowEditModal(false);
        }
        else return;
    }
    
    return (
        <div className="edit-photo-modal-container">
            <div className="edit-photo-moal-title">
                <div 
                id="edit-photo-modal-title-div-container"
                >
                    <div 
                    id="edit-photo-modal-title-div"
                    onClick={() => setShowEditModal(false)}
                    >
                        <p>x</p>
                    </div>
                </div>
                <div>Edit photo</div>
            </div>
            <div className="edit-photo-modal-photo-container">
               
                <div className="edit-photo-image">
                    <img 
                        src={url}
                        className="edited-photo"
                    />
                </div>
                <div className="edit-photo-caption-container">
                    <div className="edit-photo-caption-inner-container">
                        <div>Caption</div>
                        <p>Mention what's special about this space like comfortable furniture or favorite details.
                        </p>
                        <textarea 
                            spellCheck="true" 
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="edit-photo-modal-button-container">
                <div id="edit-photo-modal-delete-button">
                    <u onClick={handleDelete}>Delete photo</u>
                </div>
                <div className={caption.length ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                onClick={handleSave}
                >
                    <div>Save</div>
                </div>
            </div>
        </div>
    );

};