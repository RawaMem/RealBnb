


export default function HostAndSpecs({listing}) {


    return (
        <div className="hostAndSpecsContent">
            {listing.Username && (<div className="hostName">
                <h4>
                Entire home hosted by {listing.User.username}
                </h4>
            </div>)}
            <div className="listingSpecs">
                <p>{listing.maxGuests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths</p>
            </div>
        </div>
    )
}
