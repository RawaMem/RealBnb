



export default function SingleListingImages({listingImages}) {

    let previewImage;
    let nonPreviewImages = []

    listingImages.forEach(imageObj => {
        if (imageObj.preview) previewImage = imageObj;
        else nonPreviewImages.push(imageObj);
    });

    const rightImages = nonPreviewImages.slice(0, 4);

    const singleListingRightImagesClassName = (idx) => {
        if(idx === 1 ) return "right-upper-coner-images"
        if(idx === 3) return "right-bottom-coner-images"
    };


    
    return (
        <div className="singleListingImagesContent">
            <div className="leftPreviewImage">
                <img src={previewImage.url} alt="preview image" />
            </div>
            <div className="singleListingrightImageContainer">
                {!!rightImages.length && rightImages.map((imageObj, idx) => (
                    <div className="singleListingrightImages" key={imageObj.url + idx}>
                        <img src={imageObj.url} id={singleListingRightImagesClassName(idx)} />
                    </div>
                )) 
                }
            </div>
        </div>
    )
}
