import ProgressBar from 'react-bootstrap/ProgressBar';


import 'bootstrap/dist/css/bootstrap.min.css';


export default function ReviewsContainer({listing}) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];


    const calculateMonthAndYear = (dateString) => {
        const dateObj = new Date(dateString)
        const month = dateObj.toLocaleString('default', {month:'long'})
        const year = dateObj.toLocaleString('default', {year:'numeric'})
        return `${month} ${year}`

    }
    const reviewScoreCalculator = (reviewArr) => {
        let totalRating = 0
        let totalCleanliness = 0
        let totalCommunication = 0
        let totalCheckIn = 0
        let totalAccuracy = 0
        let totalLocation = 0
        let totalValue = 0
        reviewArr.forEach(review =>{
            totalRating += +review.starRating
            totalCleanliness += +review.cleanliness
            totalCommunication += +review.communication
            totalCheckIn += +review.checkIn
            totalAccuracy += +review.accuracy
            totalLocation += +review.location
            totalValue += +review.value
            // console.log('in for each totalRating', review.starRating)
        })
        return {
            aveRating : totalRating/+reviewArr.length,
            aveCleanliness : totalCleanliness/+reviewArr.length,
            aveCommunication : totalCommunication/+reviewArr.length,
            aveCheckIn : totalCheckIn/+reviewArr.length,
            aveAccuracy : totalAccuracy/+reviewArr.length,
            aveLocation : totalLocation/+reviewArr.length,
            aveValue : totalValue/+reviewArr.length,
        }
    }
    let averageScores
    if(listing.Reviews) {
    averageScores = reviewScoreCalculator(listing.Reviews)
    // console.log('HERE IS AVERAGE SCORES', averageScores)
    }

    if (!averageScores) return (
        <>
            <div className="noReviews">No reviews at this time.</div>
        </>
    )

    return (
        <>
        <div className="aveRatingAndNumReviews">
            <p className="aveReviewText">Star goes here, {averageScores.aveRating}, {listing.Reviews.length} reviews</p>
            <div className="aveRatingBars">
                <div className="leftRatings">
                    <div className="aveCleanliness">
                        Cleanliness
                        <ProgressBar now={averageScores.aveCleanliness} max={5}/>
                        {averageScores.aveCleanliness}
                    </div>
                    <div className="aveCommunication">
                        Communication
                        <ProgressBar now={averageScores.aveCommunication} max={5}/>
                        {averageScores.aveCommunication}
                    </div>
                    <div className="aveCheckin">
                        Check-in
                        <ProgressBar now={averageScores.aveCheckIn} max={5}/>
                        {averageScores.aveCheckIn}
                    </div>
                </div>
                <div className="rightRatings">
                    <div className="aveAccuracy">
                        Accuracy
                        <ProgressBar now={averageScores.aveAccuracy} max={5}/>
                        {averageScores.aveAccuracy}
                    </div>
                    <div className="aveLocation">
                        Location
                        <ProgressBar now={averageScores.aveLocation} max={5}/>
                        {averageScores.aveLocation}
                    </div>
                    <div className="aveValue">
                        Value
                        <ProgressBar now={averageScores.aveValue} max={5}/>
                        {averageScores.aveValue}
                    </div>
                </div>
            </div>
        </div>
        <div className="listingReviews">
            {listing.Reviews.map(review => (
                <div className="reviewCard">
                    <div className="reviewUserName">{review.User.username}</div>
                    <div className="reviewUserName">{calculateMonthAndYear(review.createdAt)}</div>
                    <div className="reviewContent">{review.content}</div>
                </div>
            ))}
        </div>

        </>
    )




}
