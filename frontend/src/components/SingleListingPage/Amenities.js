import { icons } from "../../ui/icons";

function Amenities( {amenities}) {
    console.log("amenities------", amenities)
    return (
        <div className="singleListingAmenity-container">
            <h3 style={{marginBottom:"2%"}}>What this place offers</h3>
            <div className="amenity-list-container">
                {amenities.map((amenity, idx) => (
                    <div className="single-amenity-container" key={amenity+idx} >
                        {icons[amenity.toLowerCase()]}
                        <div id="singleListing-amenity-name">{amenity}</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Amenities