const express = require('express')
const asyncHandler = require('express-async-handler');

const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const { requireAuth, restoreUser } = require('../../utils/auth');
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
    DirectMessageThread,
    DirectMessage,
    User } = require('../../db/models');

const router = express.Router();

// router.get('/:')




module.exports = router;
