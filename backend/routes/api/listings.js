const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require('../../awsS3');
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
//when wishlist is implemented, include wishlist so that we know which hearts are filled in
router.get('/', asyncHandler(async (req, res) => {
    const listings = await Listing.findAll({
        attributes: {
          include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],]
        },
        include: [
              {model: Review,
                attributes: []},
              ListingPrice,
              Category
            ],
        group: ['Listing.id',
                'ListingPrices.id',
                'Categories.id',
                'Categories->ListingCategory.categoryId',
                'Categories->ListingCategory.listingId',
                'Categories->ListingCategory.createdAt',
                'Categories->ListingCategory.updatedAt']
    });
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

//create listing
router.post(
  '/', 
  singleMulterUpload('image'), 
  multipleMulterUpload('image'),
  asyncHandler(async (req, res) => {
  const { 
    ownerId,
    name,
    description,
    serviceFee,
    cleaningFee,
    bedrooms,
    beds,
    baths,
    maxGuests,
    address,
    city,
    state,
    zipCode,
    longitude,
    latitude,
    imageDescription,
    listingPriceArr,
    amenityArr,
    categoryArr,
  } = req.body

  const previewImageUrl = await singlePublicFileUpload(req.file);
  // multiplePublicFileUpload returns an array where each element is the url to the s3 bucket.
  const imageArr = await multiplePublicFileUpload(req.files);


  const newListing = { 
    ownerId,
    previewImageUrl,
    name,
    description,
    serviceFee,
    cleaningFee,
    bedrooms,
    beds,
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
  // userId is called ownerId from req.body
  // listingPriceArr = [ {pricePerDay: 299, startDate: '', endDate: ''} ]
  if (listingPriceArr.length) {
    for (let i = 0; i < listingPriceArr.length; i++) {
      const listingPriceObj= {
        listingId: createdListing.id,
        userId: ownerId,
        pricePerDay: listingPriceArr[i].pricePerDay,
        startDate: listingPriceArr[i].startDate,
        endDate: listingPriceArr[i].endDate
      }
      await ListingPrice.create(listingPriceObj)
  }}

  //create listing amentities using new listing id
  // amenityArr = [amenityId, amenityId, amenityId]
  if (amenityArr.length) {
    for (let i = 0; i < amenityArr.length; i++) {
      const amenityObj= {
        listingId: createdListing.id,
        amenityId: amenityArr[i]
      }
      await ListingAmenity.create(amenityObj)
  }}

  //create listing categories using new listing id
  //categoryArr = [categoryId,categoryId,categoryId]
  if (categoryArr.length) {
    for (let i = 0; i < categoryArr.length; i++) {
      const categoryObj= {
        listingId: createdListing.id,
        categoryId:categoryArr[i]
      }
      await ListingCategory.create(categoryObj)
  }}

  // imageArr is an array returns from s3, where each element is the url to our s3 bucket.
  if (imageArr.length) {
    for (let i = 0; i < imageArr.length; i++) {
      const imageObj= {
        userId: ownerId,
        listingId: createdListing.id,
        url: imageArr[i],
        description: imageDescription
      }
      await Image.create(imageObj)
    }
  }


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


//search listings on home  page
router.get('/search', asyncHandler(async (req, res) => {
  const queryInfo = req.query
  // let test11
  let whereListing = {}
  if (req.query.destination) {
    whereListing = {[Op.or]:[
      {name: {[Op.iLike]: `%${req.query.destination}%`}},
      {address: {[Op.iLike]: `%${req.query.destination}%`}},
      {city: {[Op.iLike]: `%${req.query.destination}%`}},
      {state: {[Op.iLike]: `%${req.query.destination}%`}}
    ]}

    // test11 = {[Op.iLike]: `%${req.query.destination}%`}
    // whereListing.name = req.query.destination
    // whereListing.address = req.query.destination
    // whereListing.city = req.query.destination
    // whereListing.state = req.query.destination
  }
  if (req.query.numGuests) whereListing.maxGuests = {[Op.lte]:req.query.numGuests}

  let whereDates = {}
  if (req.query.checkIn && !req.query.checkOut) {
    console.log('CHECKIN DATE BUT NO CHECKOUT')
    whereDates = { [Op.and]: [
      {startDate: {[Op.lte]: req.query.checkIn}},
      {endDate: {[Op.gt]: req.query.checkIn}}
    ]}
    // whereDates.startDate = {[Op.lte]:req.query.checkIn}
  }
  if (req.query.checkOut && !req.query.checkIn) {
    console.log('CHECKOUT DATE BUT NO CHECKIN')

    whereDates = { [Op.and]: [
      {startDate: {[Op.lte]: req.query.checkOut}},
      {endDate: {[Op.gte]: req.query.checkOut}}
    ]}
    // whereDates.endDate = {[Op.gte]:req.query.checkOut}
  }

  if (req.query.checkIn && req.query.checkOut) {
    console.log('BOTH CHECKIN AND CHECKOUT')

    whereDates = { [Op.and]: [
        {startDate: {[Op.lte]: req.query.checkIn}},
        {endDate: {[Op.gte]: req.query.checkOut}}
    ]}
  }

  console.log('THIS IS SEARCH INFO-----------------------', queryInfo, whereListing, whereDates)

  const listings = await Listing.findAll({
    where: whereListing,
    attributes: {
      include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],]
    },
    include: [
          {model: Review,
            attributes: []},
          {model: ListingPrice,
          where: whereDates},
          Category
        ],
    group: ['Listing.id',
            'ListingPrices.id',
            'Categories.id',
            'Categories->ListingCategory.categoryId',
            'Categories->ListingCategory.listingId',
            'Categories->ListingCategory.createdAt',
            'Categories->ListingCategory.updatedAt']
});

  res.json(listings)
}))

//get single listing for listing detail page
router.get('/:listingId(\\d+)', asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const singleListing = await Listing.findByPk(listingId, {
    attributes: {
      include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],]
    },
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
                      attributes: ['id']}}}],
    group: [
                'Listing.id',
                'ListingPrices.id',
                'Bookings.id',
                'Reviews.id',
                'Images.id',
                'WishLists.id',
                'Categories.id',
                'User->Listings->Reviews.id',
                'Categories->ListingCategory.categoryId',
                'Categories->ListingCategory.listingId',
                'Categories->ListingCategory.createdAt',
                'Categories->ListingCategory.updatedAt',
                'Amenities.id',
                'Amenities->ListingAmenity.amenityId',
                'Amenities->ListingAmenity.listingId',
                'Amenities->ListingAmenity.createdAt',
                'Amenities->ListingAmenity.updatedAt',
                'WishLists->WishListListing.wishlistId',
                'WishLists->WishListListing.listingId',
                'WishLists->WishListListing.createdAt',
                'WishLists->WishListListing.updatedAt',
                'User.id',
                'User->Listings.id',
              ]
  })
  res.json(singleListing);
}));

router.post('/testing', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  const url = await singlePublicFileUpload(req.file);
}));

        module.exports = router;
