const express = require("express");
const { check, validationResult } = require("express-validator");
const { validateGuests } = require("../../utils/validations/WishList/validateGuests");
const { isValidDate } = require("../../utils/validations/WishList/isValidDate");

const { handleValidationErrors } = require("../../utils/validation");

const asyncHandler = require("express-async-handler");
const { WishList, Listing, WishListListing } = require("../../db/models");

const router = express.Router();

const validateWishList = [
	check("userId")
		.exists({ checkFalsy: true })
		.withMessage("User id is required and must be a number.")
		.bail()
		.isNumeric(),
	check("name")
		.exists({ checkFalsy: true })
		.withMessage("Name cannot be empty.")
		.bail()
		.isLength({ min: 1, max: 50 }),
	check("checkIn")
		.optional()
		.custom((value) => {
			if (!isValidDate(value)) {
				throw new Error("Check in date must be a valid date.");
			}
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			if (new Date(value) < today) {
				throw new Error("Check in date must occur after the current date.");
			}

			return true;
		}),
	check("checkOut")
		.optional()
		.custom((value, { req }) => {
			if (!isValidDate(value)) {
				throw new Error("Check out date must be a valid date.");
			}
			if (value && req.body.checkIn && new Date(req.body.checkIn) > new Date(value)) {
				throw new Error("Check out date must occur after the check in date.");
			}

			return true;
		}),
	check("adultGuests")
		.optional()
		.isNumeric()
		.withMessage("The number of adult guests must be a number.")
		.toInt()
		.custom((value) => {
			if (value < 1 || value > 16) {
				throw new Error("The number of adult guests must be between 1 and 16.");
			}

			return true;
		})
		.bail(),
	check("adultGuests")
		.optional()
		.isNumeric()
		.toInt()
		.withMessage("The number of adult guests must be a number.")
		.custom((value, { req }) => {
			const errors = validateGuests(
				value,
				req.body.childGuests,
				req.body.infantGuests,
				req.body.petGuests
			);
			if (Object.keys(errors).length > 0) {
				throw new Error(errors["adultGuests"]);
			}

			return true;
		})
		.bail(),
	check("childGuests")
		.optional()
		.isNumeric()
		.toInt()
		.custom((value) => {
			if (value < 0 || value > 15) {
				return false;
			}

			return true;
		})
		.withMessage("The number of children must be between 0 and 15"),
	check("childGuests")
		.optional()
		.isNumeric()
		.toInt()
		.custom((value, { req }) => {
			const errors = validateGuests(
				req.body.adultGuests,
				value,
				req.body.infantGuests,
				req.body.petGuests
			);
			if (Object.keys(errors).length > 0) {
				throw new Error(errors["childGuests"]);
			}

			return true;
		})
		.bail(),
	check("infantGuests")
		.optional()
		.isNumeric()
		.toInt()
		.custom((value) => {
			if (value < 0 || value > 5) {
				return false;
			}

			return true;
		})
		.withMessage("The number of infants must be between 0 and 5."),
	check("petGuests")
		.optional()
		.isNumeric()
		.toInt()
		.custom((value) => {
			if (value < 0 || value > 5) {
				return false;
			}

			return true;
		})
		.withMessage("The number of pets must be between 0 and 5"),
];

const validateWishListListing = [
	check("wishlistId")
		.exists({ checkFalsy: true })
		.withMessage("Wish list id is required and must be a number.")
		.bail()
		.isNumeric(),
	check("listingId")
		.exists({ checkFalsy: true })
		.withMessage("Listing list id is required and must be a number.")
		.bail()
		.isNumeric(),
	handleValidationErrors,
];

// TODO: Add requireAuth

router.get(
	"/:userId",
	asyncHandler(async (req, res, next) => {
		try {
			const userId = parseInt(req.params.userId, 10);
			const wishLists = await WishList.findAll({
				where: { userId },
				include: [
					{
						model: Listing,
					},
				],
			});
			res.json(wishLists);
		} catch (err) {
			next(err);
		}
	})
);

router.post(
	"/",
	validateWishList,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	asyncHandler(async (req, res, next) => {
		try {
			const wishList = await WishList.create(req.body);
			res.send(wishList);
		} catch (err) {
			next(err);
		}
	})
);

router.post(
	"/:id",
	validateWishListListing,
	asyncHandler(async (req, res, next) => {
		try {
			const wishListListing = await WishListListing.create(req.body);
			res.send(wishListListing);
		} catch (err) {
			next(err);
		}
	})
);

module.exports = router;
