const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize');

const { Listing,
   ListingPrice,
   ListingAmenity,
   ListingCategory,
   Review,
   Category,
   Image,
   Booking,
   WishList,
   Amenity,
   User } = require('../../db/models');

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

        //create listing
router.post('/', asyncHandler(async (req, res) => {
  //destucture listing info
  const { ownerId,
    previewImageUrl,
    name,
    description,
    serviceFee,
    cleaningFee,
    numRooms,
    maxGuests,
    address,
    city,
    state,
    zipCode,
    longitude,
    latitude,
    listingPriceArr,
    amenityArr,
    categoryArr,
    imageArr
  } = req.body

  const newListing = { ownerId,
    previewImageUrl,
    name,
    description,
    serviceFee,
    cleaningFee,
    numRooms,
    maxGuests,
    address,
    city,
    state,
    zipCode,
    longitude,
    latitude
  }
  //create new listing to generate id
  const createdListing = await Listing.create(newListing)

  //create listing prices using new listing id
  if (listingPriceArr.length) {
    for (let i = 0; i < listingPriceArr.length; i++) {
      const listingPriceObj= {
        listingId: createdListing.id,
        userId,
        pricePerDay,
        startDate,
        endDate
      }
      await ListingPrice.create(listingPriceObj)
  }}

  //create listing amentities using new listing id
  if (amenityArr.length) {
    for (let i = 0; i < amenityArr.length; i++) {
      const amenityObj= {
        listingId: createdListing.id,
        amenityId
      }
      await ListingAmenity.create(amenityObj)
  }}

  //create listing categories using new listing id
  if (categoryArr.length) {
    for (let i = 0; i < categoryArr.length; i++) {
      const categoryObj= {
        listingId: createdListing.id,
        categoryId
      }
      await ListingCategory.create(categoryObj)
  }}

  //create listing categories using new listing id
  if (imageArr.length) {
    for (let i = 0; i < imageArr.length; i++) {
      const imageObj= {
        listingId: createdListing.id,
        userId,
        url,
        description
      }
      await Image.create(imageObj)
  }}
  const finalListing = await Listing.findByPk(createdListing.id, {
    include: [Image,
        Category,
        ListingPrice,
        Amenity,
        Review,
        Booking,
        WishList,
        {  model: User,
          attributes: {
            exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
          },
          include: {model: Listing,
                    attributes: ['id'],
                    include: {
                      model: Review,
                      attributes: ['id']
                    }
          }
      }
      ]
  })
    res.json(finalListing);
}));

//get single listing for listing detail page
router.get('/:listingId(\\d+)', asyncHandler(async (req, res) => {
  const { listingId } = req.params
  console.log('IN THE GET ROUTE', listingId)
  const singleListing = await Listing.findByPk(listingId, {
    include: [Image,
        Category,
        ListingPrice,
        Amenity,
        Review,
        Booking,
        WishList,
        {  model: User,
          attributes: {
            exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
          },
          include: {model: Listing,
                    attributes: ['id'],
                    include: {
                      model: Review,
                      attributes: ['id']
  }}}]})
  res.json(singleListing);
}));


        module.exports = router;
