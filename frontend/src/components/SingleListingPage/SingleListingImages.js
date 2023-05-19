



export default function SingleListingImages({listingImages}) {
    console.log("listing SingleListingImages", listingImages)
    let previewImage;
    let nonPreviewImages = []

    listingImages.forEach(imageObj => {
        if (imageObj.preview) previewImage = imageObj;
        else nonPreviewImages.push(imageObj);
    });

    const rightImages = nonPreviewImages.slice(0, 4);
    
    return (
        <div className="singleListingImagesContent">
            <div className="leftPreviewImage">
                <img src={previewImage.url} alt="preview image" style={{width:"400px", height: "310px"}}/>
            </div>
            <div>
                {!!rightImages.length && rightImages.map((imageObj, idx) => (
                    <div className="rightImages" key={imageObj.url + idx}>
                        <img src={imageObj.url} style={{width:"400px", height: "310px"}} />
                    </div>
                )) 
                }
            </div>

        </div>
    )
}
