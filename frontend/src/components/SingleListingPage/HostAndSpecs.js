


export default function HostAndSpecs({listing}) {


    return (
        <div className="hostAndSpecsContent">
            <div className="hostName">
                <h4>
                Entire home hosted by {listing.User.username}
                </h4>
            </div>
            <div className="listingSpecs">
                <p>{listing.maxGuests} guests · {listing.numRooms} bedrooms · {listing.numRooms} beds · {listing.numRooms} baths</p>
            </div>
        </div>
    )
}
