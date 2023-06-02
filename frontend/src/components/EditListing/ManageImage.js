import { useState, useEffect } from "react";
import "./editListing.css";

function ManageImage({previewImageUrl, setPreviewImageUrl, image, handleRemovingImages,imageIdx, setAddedImages}) {
    const [showMenu, setShowMenu] = useState(false);

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

      function handlePreviewImage () {
        previewImageUrl !== image.url ? setPreviewImageUrl(image.url) : setPreviewImageUrl(null)
      };

      const dropDown = (
        <div className="image-drop-down">
          <div onClick={handlePreviewImage}>{previewImageUrl ===  image.url ? 'Remove Cover Photo' : 'Make cover photo' }</div>
          <div onClick={() => handleRemovingImages(imageIdx, image.id, image.url)}>Delete</div>
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

export default ManageImage;