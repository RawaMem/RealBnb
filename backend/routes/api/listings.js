const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize');

const { Listing, ListingPrice, Review, Category } = require('../../db/models');

const router = express.Router();

// get all listings
//when wishlist is implemented, include wishlist so that we know which hearsts are filled in
router.get('/', asyncHandler(async (req, res) => {
    const listings = await Listing.findAll({
        // attributes: [
        //           [Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],

        //         ],
        include: [
                  Review,
                  // {
                  //   model: Review,
                  //   as: 'avgReview',
                  //   attributes: [],
                  // },
                  ListingPrice,
                  Category
                ],

    });
    console.log("=======this is listing=====", listings[0].Categories)
    return res.json(listings);
}));


//ask Alec how to do aggregate average rating for findall listings including reviews
// Model.User.findOne({
//     where: { id: 7 },
//     attributes: [
//       [Sequelize.fn('AVG', Sequelize.col('seller_rating.stars')), 'avgRating'],
//     ],
//     include: [
//       {
//         model: Model.Rating,
//         as: 'seller_rating',
//         attributes: [],
//       },
//     ],
//     raw: true,
//     group: ['User.id'],
//   }).then((res) => console.log(res));



module.exports = router;
