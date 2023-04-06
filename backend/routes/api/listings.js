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
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: ListingPrice,
        attributes: ['pricePerDay', 'startDate', 'endDate']
      },
      {
        model: Category,
        attributes: ['name']
      }
    ],
    attributes: {
      include:[[
        Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'
      ]],
    },
    group: [
      'Listing.id',
      "ListingPrices.id",
      "Categories.id",
      "Categories->ListingCategory.listingId",
      'Categories->ListingCategory.id',
    ]  
  });
  return res.json(listings);
}));


//create new listing and listing price.
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const {newListingObj, listingPricing} = req.body;
    
    const ownerId = req.user.id;

    newListingObj.ownerId = ownerId;
    //create new listing to generate id
    const createdListing = await Listing.create(newListingObj)
    if(createdListing) {
      await ListingPrice.create({
        ...listingPricing,
        listingId: createdListing.id,
        userId: ownerId
      });
    };

    return res.json(createdListing);
  }));

  // create new listing amenities and categories
  router.post(
    '/:listingId/amenity-category',
    requireAuth,
    asyncHandler(async(req, res) => {
      const listingId = req.params.listingId;
      console.log('in the amenity route', req.body)
      const {amenities, categories} = req.body;

      const findNewListing = await Listing.findByPk(listingId);

      if(findNewListing) {
        for(let amenity of amenities) {
          const newAmenity = await Amenity.create({
            name:amenity
          });
          await newAmenity.addListing(findNewListing);
        };

        for(let category of categories) {
          const newCategory = await Category.create({
            name: category
          })
          await findNewListing.addCategories(newCategory);
        };
      };
      res.json(findNewListing)  
    })
  );

  // creating listing images
  router.post(
    '/:listingId/images',
    singleMulterUpload('image'),
    requireAuth,
    asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const listingId = req.params.listingId
    const {description} = req.body;
    const url = await singlePublicFileUpload(req.file);

    const newImage = await Image.create({
      userId,
      listingId,
      url,
      description
    });

    if(newImage) {
      res.json({'newImage': newImage })
    }
  }));


//search listings on home  page
router.get('/search', asyncHandler(async (req, res) => {
  const queryInfo = req.query
  // let test11
  let whereListing = {}
  if (req.query.destination) {
    whereListing = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${req.query.destination}%` } },
        { address: { [Op.iLike]: `%${req.query.destination}%` } },
        { city: { [Op.iLike]: `%${req.query.destination}%` } },
        { state: { [Op.iLike]: `%${req.query.destination}%` } }
      ]
    }

    // test11 = {[Op.iLike]: `%${req.query.destination}%`}
    // whereListing.name = req.query.destination
    // whereListing.address = req.query.destination
    // whereListing.city = req.query.destination
    // whereListing.state = req.query.destination
  }
  if (req.query.numGuests) whereListing.maxGuests = { [Op.lte]: req.query.numGuests }

  let whereDates = {}
  if (req.query.checkIn && !req.query.checkOut) {
    console.log('CHECKIN DATE BUT NO CHECKOUT')
    whereDates = {
      [Op.and]: [
        { startDate: { [Op.lte]: req.query.checkIn } },
        { endDate: { [Op.gt]: req.query.checkIn } }
      ]
    }
    // whereDates.startDate = {[Op.lte]:req.query.checkIn}
  }
  if (req.query.checkOut && !req.query.checkIn) {
    console.log('CHECKOUT DATE BUT NO CHECKIN')

    whereDates = {
      [Op.and]: [
        { startDate: { [Op.lte]: req.query.checkOut } },
        { endDate: { [Op.gte]: req.query.checkOut } }
      ]
    }
    // whereDates.endDate = {[Op.gte]:req.query.checkOut}
  }

  if (req.query.checkIn && req.query.checkOut) {
    console.log('BOTH CHECKIN AND CHECKOUT')

    whereDates = {
      [Op.and]: [
        { startDate: { [Op.lte]: req.query.checkIn } },
        { endDate: { [Op.gte]: req.query.checkOut } }
      ]
    }
  }

  console.log('THIS IS SEARCH INFO-----------------------', queryInfo, whereListing, whereDates)

  const listings = await Listing.findAll({
    where: whereListing,
    attributes: {
      include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],]
    },
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: ListingPrice,
        where: whereDates
      },
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
      include: [
        //attempted to do average aggregate query with sql literal
        //   [Sequelize.literal(`(
        //     SELECT AVG(starRating)
        //     FROM Reviews AS Review
        //     WHERE
        //         Review.listingId = ${listingId}
        // )`),
        // 'avgRating'],


        //aggregate function for average not calculating correctly, will calculate on front end instead
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.starRating')), 'avgRating'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.cleanliness')), 'aveCleanliness'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.communication')), 'aveCommunication'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.checkIn')), 'aveCheckIn'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.accuracy')), 'aveAccuracy'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.location')), 'aveLocation'],
        // [Sequelize.fn('AVG', Sequelize.col('Reviews.value')), 'aveValue'],
      ]
    },
    include: [Image,
      Category,
      ListingPrice,
      Amenity,
      {
        model: Review,
        include: {
          model: User,
          attributes: ['username'],
        }
      },
      Booking,
      WishList,
      {
        model: User,
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
        include: {
          model: Listing,
          attributes: ['id'],
          include: {
            model: Review,
            attributes: ['id']
          }
        }
      }],
    group: [
      'Reviews.id',
      'Listing.id',
      'ListingPrices.id',
      'Bookings.id',
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
      'Reviews->User.id'
    ]
  })
  res.json(singleListing);
}));

router.post('/testing', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  const url = await singlePublicFileUpload(req.file);
}));

module.exports = router;
