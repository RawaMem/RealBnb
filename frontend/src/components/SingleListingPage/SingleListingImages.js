



export default function SingleListingImages({listing}) {


    console.log('THIS IS IMAGE ARRAY', listing.Images)



    return (
        <div className="singleListingImagesContent">
            <div className="leftPreviewImage">
                <img src={listing.previewImageUrl} alt="" />
            </div>
            <div className="rightImages">
                <img src={listing.Images[0].url} alt="" />
                <img src={listing.Images[1].url} alt="" />
                <img src={listing.Images[2].url} alt="" />
                <img src={listing.Images[3].url} alt="" />
                <img src={listing.Images[4].url} alt="" />
            </div>
        </div>
    )
}
