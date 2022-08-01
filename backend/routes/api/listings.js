const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize');

const { Listing, ListingPrice, Review } = require('../../db/models');

const router = express.Router();

// get all listings
router.get('/', asyncHandler(async (req, res) => {
    const listings = await Listing.findAll({
        attributes: [
                  [Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],

                ],
        include: [
                  {
                    model: Review,
                    // as: 'avgReview',
                    attributes: [],
                  },
                  ListingPrice
                ],

    });
    console.log("=======this is listing=====")
    return res.json(listings);
}));



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
