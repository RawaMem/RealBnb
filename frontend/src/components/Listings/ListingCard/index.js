

export default function ListingCard({listing}) {

    // const avgReviewRating = () => {
    //     let totalRating = 0;
    //     if (listing.Reviews) {
    //         const reviews = listing.Reviews;
    //         reviews.map((review) => {
    //             totalRating += review.starRating
    //         })

    //         const rounded = Math.round(totalRating / reviews.length * 10) / 10
    //         var fixed = rounded.toFixed(1)
    //         return fixed
    //     } else {
    //         return "New"
    //     }
    // }

    const avaDate = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let avaDateRes, startMonth, endMonth, startDate, endDate;
        if (listing?.ListingPrices[0]) {
            // "2022-09-01T00:00:00.000Z"
            const startDateString = listing.ListingPrices[0].startDate
            if (startDateString.substr(8, 2) === "01") {
                // 9-2+1 = 8
                startMonth = monthNames[(new Date(startDateString).getMonth()) + 1]
                startDate = startMonth + " 1"
            } else {
                startDate = monthNames[new Date(startDateString).getMonth()] + " " + new Date(startDateString).getDate()
            }

            const endDateString = listing.ListingPrices[0].endDate
            if (endDateString.substr(8, 2) === "01") {
                endMonth = monthNames[(new Date(endDateString).getMonth()) + 1]
                endDate = endMonth + " 1"
            } else {
                if (startMonth === endMonth) endDate = new Date(endDateString).getDate()
                else endDate = monthNames[new Date(endDateString).getMonth()] + " " + new Date(endDateString).getDate()
            }
            avaDateRes = startDate + " - " + endDate
        }
        return avaDateRes
    }

    return (
        <>            
                <div key={listing.id}>   
                    <img alt="listing" width="340" height="350" src={listing.previewImageUrl} loading="lazy" style={{ borderRadius: "15px"}} />
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:"10px" }}>
                        <div>
                            <div style={{color: "#323232", fontWeight: "600", fontSize:"15px"}}>{listing.name}</div>
                            <div style={{ color:"#7f7f7f", fontSize:"14px" }}>{avaDate()}</div>
                            <div>
                                <span style={{color: "#323232", fontWeight: "600", fontSize:"14px"}}>${listing.ListingPrices[0].pricePerDay}
                                </span> 
                                <span style={{color: "#4c4c4c"}}> night</span>
                            </div>                            
                        </div>
                        <div>
                            <div style={{display:"flex",}}>
                                <span className="material-symbols-outlined" style={{color: "#323232", display:"absolute", marginTop:"-4px"}}>star</span> 
                                <span style={{color: "#4c4c4c", fontSize:"15px"}}>{listing.avgRating ? Number(listing.avgRating).toFixed(2): "New"}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
