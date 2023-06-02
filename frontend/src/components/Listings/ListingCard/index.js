export default function ListingCard({listing}) {

    const avaDate = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        let avaDateRes, startMonth, endMonth, startDate, endDate;
        if(listing.ListingPrices[0]) {
            // "2022-09-01T00:00:00.000Z"
            const startDateString = listing.ListingPrices[0].startDate;
            const getStartMonth = new Date(startDateString).getMonth();
            
            // if date is Jan 1st, getMonth() returns 11, monthNames[12] is out of range.
            // if the date is the 1st, getMonth() returns current month - 2.
            if (startDateString.substr(8, 2) === "01") {
                if(getStartMonth === 11) startMonth = monthNames[0];
                else startMonth = monthNames[getStartMonth + 1];
                startDate = startMonth + " 1"
            } else {
                if(getStartMonth === 11) startMonth = monthNames[0];
                else startMonth = monthNames[getStartMonth];                    
                startDate = startMonth + " " + (new Date(startDateString).getDate()+1)
            };
            

            const endDateString = listing.ListingPrices[0].endDate;
            const getEndMonth = new Date(endDateString).getMonth();

            if (endDateString.substr(8, 2) === "01") {
                if(getEndMonth === 11) endMonth = monthNames[0];
                else endMonth = monthNames[(new Date(endDateString).getMonth()) + 1];
                endDate = endMonth + " 1"
            } else {
                if(getEndMonth === 11) endMonth = monthNames[0];
                if (startMonth === endMonth) endDate = new Date(endDateString).getDate()+1;
                else {
                    endDate = monthNames[getEndMonth] + " " + (new Date(endDateString).getDate()+1)
                };
            };
        };
        avaDateRes = startDate + " - " + endDate ;      
        return avaDateRes;
    };

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
