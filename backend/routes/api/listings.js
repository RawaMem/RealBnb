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
  singlePublicFileDelete,
	extractKeyFromUrl,
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
  User, 
  sequelize} = require('../../db/models');

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
      },
      {
        model: Image,
        where: {
          preview: true
        },
        attributes: ["url"]
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
      "Images.id"
    ]
  });

  const newListing = listings.map(singleListing => {
    const convertListings = singleListing.toJSON();
    convertListings.previewImageUrl = convertListings.Images[0].url;
    delete convertListings["Images"];
    return convertListings
  });

  return res.json(newListing);
}));


//create new listing and listing price.
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const {
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
      latitude
      } = req.body;

    const {
      pricePerDay,
      startDate,
      endDate
      } = req.body;

    const listingPricing = {
      pricePerDay,
      startDate,
      endDate
    };

    const newListing = {
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
      latitude
    };

    const ownerId = req.user.id;

    newListing.ownerId = ownerId;
    //create new listing to generate id
    const createdListing = await Listing.create(newListing)

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

// delete amenities by id
router.delete('/:amenityId/delete', requireAuth, asyncHandler(async(req, res) => {
  const amenityId = req.params.amenityId;
  const findAmenity = await Amenity.findByPk(amenityId);

  if(!findAmenity) res.status(404).json({
    message: `amenity with id of ${amenityId} not found`
  });

  const deletedAmenity = await findAmenity.destroy();
  if(deletedAmenity) res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
}));

//delete category by id
router.delete('/:categoryId/delete', requireAuth, asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  const findCategory = await Amenity.findByPk(categoryId);

  if(!findCategory) res.status(404).json({
    message: `category with id of ${categoryId} not found`
  });

  const deletedCategory = await findCategory.destroy();
  if(deletedCategory) res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
}));

  // creating listing images
router.post(
  '/:listingId/images',
  singleMulterUpload('image'),
  requireAuth,
  asyncHandler(async(req, res) => {
  const userId = req.user.id;
  const listingId = req.params.listingId
  const {description, preview} = req.body;
  const url = await singlePublicFileUpload(req.file);

  const newImage = await Image.create({
    userId,
    listingId,
    url,
    preview,
    description
  });

  if(newImage) {
    res.json({'newImage': newImage })
  }
}));

//edit listing image preview status by imageId
router.patch("/edit/:imageId", requireAuth, asyncHandler(async(req, res) => {
  const imageId = req.params.imageId;
  const {preview} = req.body;

  const findImage = await Image.findByPk(imageId);
  if (!findImage) res.status(404).json({
    message: `Image with id of ${imageId} couldn't be found`
  });

  const editedImage = await findImage.update(req.body);
  if(editedImage) res.status(200).json(editedImage);
}));

  //edit a listing by its id
router.patch("/:listingId/edit", requireAuth, asyncHandler(async(req, res) => {
  const listingId = req.params.listingId;
  const findListing = await Listing.findByPk(listingId);

  if(!findListing) {
    res.status(404);
        res.json({
            message: `"List with id of ${listingId} couldn't be found"`
        });
  };

  const updatedListing = await findListing.update(req.body);
  if(updatedListing) res.status(200).json(updatedListing);
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


// get single listing for listing detail page refactor
router.get('/:listingId(\\d+)', asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const singleListing = await Listing.findByPk(listingId, {
    include:[
      {
        model: Image,
        attributes: ["url", "preview","description", "id"]
      },
      {
        model: Category,
        attributes: ["name"]
      },
      {
        model: ListingPrice,
        attributes: ["pricePerDay", "startDate", "endDate"]
      },
      {
        model: Amenity,
        attributes: ["name"]
      },
      {
        model: Review,
        include: {
          model: User,
          attributes: ["username", "id"]
        },
        attributes: {
          exclude: ["authorId", "listingId"]
        }
      },  
      {
        model: Booking,
        attributes: ["startDate", "endDate"]
      },
      WishList,
    ],
   
  });

  if(!singleListing) {
    res.status(404);
        res.json({
            message: `"List with id of ${listingId} couldn't be found"`
        });
  };

  const convertListing = singleListing.toJSON();
  const newAmenitiesArr = convertListing["Amenities"].map(amnityObj => amnityObj.name)
  convertListing["Amenities"] = newAmenitiesArr;

  const newCategoryArr = convertListing["Categories"].map(categoryObj => categoryObj.name);
  convertListing["Categories"] = newCategoryArr;

  const totalReviews = await singleListing.countReviews();
  convertListing["totalNumOfReviews"] = totalReviews;

  const totalRating = await Review.sum("starRating", {where: {listingId}});
  convertListing["avgRating"] = (totalRating / totalReviews).toFixed(2);

  const owner = await User.findOne({
    where: {id: singleListing.ownerId},
    attributes: {
      exclude: ["id"]
    }
  });
  
  convertListing["hostInfo"] = owner;

  res.json(convertListing)
}));

//get listing by its id for edit form
router.get("/:listingId/editForm", requireAuth, asyncHandler(async(req, res) => {
  const listingId = req.params.listingId;

  const listingInfo = await Listing.findByPk(listingId, {
    include: [
      {
        model: Image,
        attributes: ["url","id","preview"]
      },
      {
        model: ListingPrice,
        attributes: ["pricePerDay", "startDate", "endDate", "id"]
      },
      {
        model: Category,
        attributes: ["name","id"]
      }, 
      {
        model: Amenity,
        attributes: ["name","id"]
      }
    ]
  });


  if(!listingInfo) {
    res.status(404);
        res.json({
            message: `"List with id of ${listingId} couldn't be found"`
        });
  };

  const cleanUpListingInfo = listingInfo.toJSON();
  const categoryArr = cleanUpListingInfo.Categories;
  const newCategoryArr = [];
  categoryArr.forEach(categoryObj => {
    newCategoryArr.push({name: categoryObj.name, id: categoryObj.id})
  });
  cleanUpListingInfo.Categories = newCategoryArr;
  const amenitiesArr = cleanUpListingInfo.Amenities;
  const newAmenityArr = [];
  amenitiesArr.forEach(amenityObj => {
    newAmenityArr.push({name: amenityObj.name, id: amenityObj.id});
  });
  cleanUpListingInfo.Amenities = newAmenityArr;

  const previewImageUrl = cleanUpListingInfo["Images"].find(img => !!img.preview);
  cleanUpListingInfo.previewImageUrl = previewImageUrl.url;

  res.json(cleanUpListingInfo);
}));

//get all listings of the logged in user
router.get('/user', requireAuth, asyncHandler(async(req, res) => {
  const {user} = req;

  const allUserListings = await Listing.findAll({
    where: {
      ownerId: user.id
    },
    include: [
      {
        model: ListingPrice,
        attributes:["pricePerDay", "startDate", "endDate"]
      },
      {
        model: Image,        
        where: {
          preview: true
        },
        attributes: ["url"]
        
      }
    ],
    order: [ [ListingPrice, "startDate"] ]
  });

  if(allUserListings) res.json({userListings:allUserListings})
  else {
    res.json({message: "You don't have any listings."})
  }
}));


router.delete('/:listingId/delete', requireAuth, singleMulterUpload("image"), asyncHandler(async(req, res) => {
  const listingId = req.params.listingId;

  const user = req.user;

  const findListing = await Listing.findByPk(listingId);

  if(!findListing) return res.json({
    "message": `Event with ID ${listingId} couldn't be found`,
    "statusCode": 404
  });

  if(findListing.ownerId !== user.id) return res.json({
    "message": "Only the host have access to delete the current listing",
    "statusCode": 404
  });

  const listingImageObjs = await findListing.getImages();
  const listingImageUrls = listingImageObjs.map(imageObj => imageObj.url);
  for(const url of listingImageUrls) {
    const isS3Image = url.match(/^https:\/\/realbnb\.s3\.amazonaws\.com\/\d+\.webp$/);
    if (!!isS3Image) {
      const keyToDelete = extractKeyFromUrl(url);
      await singlePublicFileDelete(keyToDelete);
    };
  };

  let deletedListing = await findListing.destroy();

  if(deletedListing) res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });    
}));

//delete individual spot images from database and aws.
router.delete("/listingImage/delete/:imageId", requireAuth, singleMulterUpload("image"), asyncHandler(async(req, res) => {
  const imageId = req.params.imageId;

  const findImage = await Image.findByPk(imageId);

  if(!findImage) return res.json({
    "message": `Image with ID ${imageId} couldn't be found`,
    "statusCode": 404
  });

  const convertFindImage = findImage.toJSON();

//"https://realbnb.s3.amazonaws.com/1683153626348.webp"
    const imageUrl = convertFindImage.url;
    const isS3Image = imageUrl.match(/^https:\/\/realbnb\.s3\.amazonaws\.com\/\d+\.webp$/);
    if (!!isS3Image) {
      const keyToDelete = extractKeyFromUrl(imageUrl);
      await singlePublicFileDelete(keyToDelete);
    };

    const deletedImage = await findImage.destroy();

    if(deletedImage) res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    });  
}));


module.exports = router;
