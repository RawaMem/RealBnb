



export default function SingleListingImages({listing}) {






    return (
        <div className="singleListingImagesContent">
            <div className="leftPreviewImage">
                <img src={listing.previewImageUrl} alt="" />
            </div>
            <div className="rightImages">
                <img src={listing.Images[0]} alt="" />
                <img src={listing.Images[1]} alt="" />
                <img src={listing.Images[2]} alt="" />
                <img src={listing.Images[3]} alt="" />
                <img src={listing.Images[4]} alt="" />
            </div>
        </div>
    )
}
