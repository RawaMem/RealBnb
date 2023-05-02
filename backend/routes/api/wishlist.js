const express = require("express");
const { check } = require("express-validator");
const { validateGuests } = require("../../utils/validations/WishList/validateGuests");
const { isValidDate } = require("../../utils/validations/WishList/isValidDate");

const { handleValidationErrors } = require("../../utils/validation");

const asyncHandler = require("express-async-handler");
const { WishList, Listing, WishListListing } = require("../../db/models");

const router = express.Router();

function getWishListValidation(isPutRequest) {
	return [
		check("userId")
			.exists({ checkFalsy: true })
			.withMessage("User id is required and must be a number.")
			.bail()
			.isNumeric(),
		check("name")
			.if((value, { req }) => !isPutRequest || (isPutRequest && value !== undefined))
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
			.custom((value, { req }) => {
				if (isNaN(value)) {
					throw new Error("The number of adults must be a number.");
				}
				if (value < 1 || value > 16) {
					throw new Error("The number of adults must be between 1 and 16.");
				}
				const errors = validateGuests(parseInt(value, 10), parseInt(req.body.childGuests, 10));

				if (Object.keys(errors).length > 0) {
					throw new Error(errors["adultGuests"]);
				}

				return true;
			}),
		check("childGuests")
			.optional()
			.custom((value, { req }) => {
				const errors = validateGuests(parseInt(req.body.adultGuests, 10), parseInt(value, 10));
				if (isNaN(value)) {
					throw new Error("The number of children must be a number.");
				}
				if (value < 0 || value > 15) {
					throw new Error("The number of children must be between 0 and 15");
				}
				if (Object.keys(errors).length > 0) {
					throw new Error(errors["childGuests"]);
				}

				return true;
			}),
		check("infantGuests")
			.optional()
			.custom((value) => {
				if (isNaN(value)) {
					throw new Error("The number of infants must be a number.");
				}
				if (value < 0 || value > 5) {
					throw new Error("The number of infants must be between 0 and 5.");
				}

				return true;
			}),
		check("petGuests")
			.optional()
			.custom((value) => {
				if (isNaN(value)) {
					throw new Error("The number of pets must be a number.");
				}
				if (value < 0 || value > 5) {
					throw new Error("The number of pets must be between 0 and 5.");
				}

				return true;
			}),
		handleValidationErrors,
	];
}

const validateWishListListing = [
	check("wishlistId")
		.exists({ checkFalsy: true })
		.custom((value) => {
			if (isNaN(value)) {
				throw new Error("Wish list id must be a number");
			}

			return true;
		}),
	check("listingId")
		.exists({ checkFalsy: true })
		.custom((value) => {
			if (isNaN(value)) {
				throw new Error("List id must be a number");
			}

			return true;
		}),
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
	getWishListValidation(false),
	asyncHandler(async (req, res, next) => {
		try {
			const wishList = await WishList.create(req.body);
			res.send(wishList);
		} catch (err) {
			next(err);
		}
	})
);

router.put(
	"/:wishlistId",
	getWishListValidation(true),
	asyncHandler(async (req, res, next) => {
		try {
			const wishlistId = parseInt(req.params.wishlistId, 10);
			const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
			const updatedWishList = await foundWishList.update({
				...req.body,
			});
			res.json(updatedWishList);
		} catch (err) {
			next(err);
		}
	})
);

router.post(
	"/:wishlistId",
	validateWishListListing,
	asyncHandler(async (req, res, next) => {
		try {
			const wishlistId = parseInt(req.params.wishlistId, 10);
			const wishListListing = await WishListListing.create({
				wishlistId,
				...req.body,
			});
			res.send(wishListListing);
		} catch (err) {
			next(err);
		}
	})
);

module.exports = router;
