const express = require('express');
const asyncHandler =  require('express-async-handler');
const {Review, User, Listing, Image} = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get('/userReviews', requireAuth, asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const userReviews = await Review.findAll({
        where: {
            authorId: userId
        },
        attributes: {
            exclude: ["authorId"]
        },
        include:[
            {
                model: Listing,
                attributes: ["name"],
                include: {
                    model: Image,
                    where: {
                        preview: true
                    },
                    attributes: ["url"]
                }
            },
        ] 
    });

    const userReviewData = [];
    if(userReviews.length) {
        userReviews.forEach(data => {
            const jsonData = data.toJSON();
            const listingName = jsonData["Listing"].name;
            const listingImageUrl = jsonData["Listing"].Images[0].url;
            jsonData.listingName = listingName;
            jsonData.listingImageUrl = listingImageUrl;
            delete jsonData["Listing"];
            userReviewData.push(jsonData);
        });
    };

    res.json(userReviewData);
}));


router.post('/', asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body)
    const reviewWithUser = await Review.findByPk(newReview.id, {
        include: [{
            model: User,
            attributes: ['username'],
          }]
    })
    res.json(reviewWithUser)
}))

router.put('/:reviewId', asyncHandler(async(req, res)=> {
    const {reviewId} = req.params
    const reviewToEdit = await Review.findByPk(reviewId)

    await reviewToEdit.update(req.body)

    const reviewWithUserData = await Review.findByPk(reviewToEdit.id, {
        include: [{
            model: User,
            attributes: ['username', 'id'],
          }]
    })

    const reviewListing = await Listing.findByPk(reviewToEdit.listingId, {
        include: {
            model: Image,
            where: {
                preview: true
            },
            attributes: ["url"]
        },
        attributes: ['name']
    });

    const reviewWithUserDataJson = reviewWithUserData.toJSON();

    reviewWithUserDataJson.listingName = reviewListing.name;
    reviewWithUserDataJson.listingImageUrl = reviewListing["Images"][0].url
    res.json(reviewWithUserDataJson)
}))

router.delete('/:reviewId', asyncHandler(async(req, res)=>{
    const {reviewId} = req.params
    const reviewToDelete = await Review.findByPk(reviewId)
    reviewToDelete.destroy()
    res.json({message: 'Review successfully deleted'})
}))

module.exports = router
