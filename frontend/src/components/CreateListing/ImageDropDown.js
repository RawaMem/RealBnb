import { useState, useEffect } from "react";
import './createListing.css';
import { useListing } from "../../context/ListingContext";

export default function ImageDropDown({ handleDeleteImage, url, setShowEditModal, setEditedPhotoUrl }) {
    const [showMenu, setShowMenu] = useState(false);
    const {previewImageUrl, setPreviewImageUrl} = useListing();


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
      
    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = () => {
          setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const dropDown = (
      <div className="image-drop-down">
        <div onClick={() => {setShowEditModal(true); setEditedPhotoUrl(url)}}>Edit</div>
        <div onClick={()=>setPreviewImageUrl(url)}>Make cover photo</div>
        <div onClick={() => handleDeleteImage(url)}>Delete</div>
      </div>  
    );

    return (
        <div className="image-drop-down-container">
            <span 
                className="image-drop-down-button"
                onClick={openMenu}
            >
                ...
            </span>
            {showMenu && dropDown}
        </div>
    );

};