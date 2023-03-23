import { useEffect, useState, useRef } from "react";
import './createListing.css';

export default function EditPhotoForm({setShowEditModal, url, handleDeleteImage, setImageDescription}) {
    const [caption, setCaption] = useState(localStorage.getItem('image caption') || '')

    function handleDelete() {
        handleDeleteImage(url);
        setImageDescription(prev => {
            const copiedPrev = {...prev};
            delete copiedPrev[url];
            return copiedPrev
        });
        localStorage.removeItem('image caption');
        setShowEditModal(false);
    };

    function handleSave() {
        setImageDescription(prev => {
        const updateImageDescription = {...prev};
        updateImageDescription[url] = caption;
        return updateImageDescription;
        });

        localStorage.setItem('image caption', caption);
        setShowEditModal(false);
    };
    
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
                            defaultValue={localStorage.getItem('image caption')}
                        />
                    </div>
                </div>
            </div>
            <div className="edit-photo-modal-button-container">
                <div id="edit-photo-modal-delete-button">
                    <u onClick={handleDelete}>Delete photo</u>
                </div>
                <div className={caption ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                onClick={handleSave}
                >
                    <div>Save</div>
                </div>
            </div>
        </div>
    );

};