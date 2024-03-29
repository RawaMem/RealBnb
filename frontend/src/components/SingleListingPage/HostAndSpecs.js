


export default function HostAndSpecs({listing}) {
    const hostName = listing.hostInfo.username


    return (
        <div className="hostAndSpecsContent">
            <div className="hostName">
                <h4>
                Entire home hosted by {hostName}
                </h4>
            </div>
            <div className="listingSpecs">
                <p>{listing.maxGuests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths</p>
            </div>
        </div>
    )
}
