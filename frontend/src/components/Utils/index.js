

export const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

export const reviewScoreCalculator = (reviewArr, currentUser) => {
    let totalRating = 0
    let totalCleanliness = 0
    let totalCommunication = 0
    let totalCheckIn = 0
    let totalAccuracy = 0
    let totalLocation = 0
    let totalValue = 0
    let showLeaveReviewButton = true
    reviewArr.forEach(review =>{
        totalRating += +review.starRating
        totalCleanliness += +review.cleanliness
        totalCommunication += +review.communication
        totalCheckIn += +review.checkIn
        totalAccuracy += +review.accuracy
        totalLocation += +review.location
        totalValue += +review.value
        if (currentUser && review.authorId === currentUser.id) showLeaveReviewButton = false
    })
    return {
        aveRating : totalRating/+reviewArr.length,
        aveCleanliness : totalCleanliness/+reviewArr.length,
        aveCommunication : totalCommunication/+reviewArr.length,
        aveCheckIn : totalCheckIn/+reviewArr.length,
        aveAccuracy : totalAccuracy/+reviewArr.length,
        aveLocation : totalLocation/+reviewArr.length,
        aveValue : totalValue/+reviewArr.length,
        showLeaveReviewButton
    }
}

export const calculateMonthAndYear = (dateString) => {
    const dateObj = new Date(dateString)
    const month = dateObj.toLocaleString('default', {month:'long'})
    const year = dateObj.toLocaleString('default', {year:'numeric'})
    return `${month} ${year}`
}
