const express = require("express");
const { check } = require("express-validator");
const { validateGuests } = require("../../utils/validations/WishList/validateGuests");
const { isValidDate } = require("../../utils/validations/WishList/isValidDate");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

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
			.if((value) => !isPutRequest || (isPutRequest && value !== undefined))
			.exists({ checkFalsy: true })
			.withMessage("Name cannot be empty.")
			.bail()
			.isLength({ min: 1, max: 50 }),
		check("wishlistId")
			.optional()
			.custom(async (value, { req }) => {
				if (req.method === "PUT") {
					const wishlistId = parseInt(value, 10);
					const foundWishList = await WishList.findOne({ where: { id: wishlistId } });

					if (!foundWishList) {
						throw new Error("Wish list not found.");
					}
				}
			}),
		check("checkIn")
			.optional()
			.custom(async (value, { req }) => {
				if (!isValidDate(value)) {
					throw new Error("Check in date must be a valid date.");
				}
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				if (new Date(value) < today) {
					throw new Error("Check in date must occur after the current date.");
				}
				if (req.method === "PUT") {
					const wishlistId = parseInt(req.params.wishlistId, 10);
					const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
					const existingCheckOutDate = foundWishList.checkOut;
					if (value && existingCheckOutDate && !(existingCheckOutDate > new Date(value))) {
						throw new Error("Check out date must occur after the check in date.");
					}
				}

				return true;
			}),
		check("checkOut")
			.optional()
			.custom(async (value, { req }) => {
				if (!isValidDate(value)) {
					throw new Error("Check out date must be a valid date.");
				}
				const today = new Date();
				today.setHours(0, 0, 0, 0);
				if (new Date(value) < today) {
					throw new Error("Check out date must occur after the current date.");
				}
				if (req.method === "PUT") {
					const wishlistId = parseInt(req.params.wishlistId, 10);
					const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
					const existingCheckInDate = foundWishList.checkIn;
					if (value && existingCheckInDate && existingCheckInDate > new Date(value)) {
						throw new Error("Check out date must occur after the check in date.");
					}
				}
				if (value && req.body.checkIn && new Date(req.body.checkIn) > new Date(value)) {
					throw new Error("Check out date must occur after the check in date.");
				}

				return true;
			}),
		check("adultGuests")
			.optional()
			.custom(async (value, { req }) => {
				if (isNaN(value)) {
					throw new Error("The number of adults must be a number.");
				}
				const intValue = parseInt(value, 10);
				if (intValue < 1 || intValue > 16) {
					throw new Error("The number of adults must be between 1 and 16.");
				}
				if (req.method === "PUT") {
					const wishlistId = parseInt(req.params.wishlistId, 10);
					const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
					const existingChildGuests = parseInt(foundWishList.childGuests, 10);
					const errors = validateGuests(intValue, existingChildGuests);

					if (Object.keys(errors).length > 0) {
						throw new Error(errors["adultGuests"]);
					}
				} else {
					const errors = validateGuests(intValue, parseInt(req.body.childGuests, 10));

					if (Object.keys(errors).length > 0) {
						throw new Error(errors["adultGuests"]);
					}
				}

				return true;
			})
			.toInt(),
		check("childGuests")
			.optional()
			.custom(async (value, { req }) => {
				if (isNaN(value)) {
					throw new Error("The number of children must be a number.");
				}
				const intValue = parseInt(value, 10);
				if (intValue < 0 || intValue > 15) {
					throw new Error("The number of children must be between 0 and 15.");
				}
				if (req.method === "PUT") {
					const wishlistId = parseInt(req.params.wishlistId, 10);
					const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
					const existingAdultGuests = parseInt(foundWishList.adultGuests, 10);
					const errors = validateGuests(existingAdultGuests, intValue);

					if (Object.keys(errors).length > 0) {
						throw new Error(errors["adultGuests"]);
					}
				} else {
					const errors = validateGuests(parseInt(req.body.adultGuests, 10), intValue);

					if (Object.keys(errors).length > 0) {
						throw new Error(errors["adultGuests"]);
					}
				}

				return true;
			})
			.toInt(),
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

router.get(
	"/:userId",
	requireAuth,
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
			if (!wishLists.length) {
				return res.status(404).json({ errors: "No wish lists found for this user." });
			}
			res.json(wishLists);
		} catch (err) {
			next(err);
		}
	})
);

router.post(
	"/",
	requireAuth,
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
	requireAuth,
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

router.delete(
	"/:wishlistId",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		try {
			const wishlistId = parseInt(req.params.wishlistId, 10);
			const foundWishList = await WishList.findOne({ where: { id: wishlistId } });
			if (!foundWishList) {
				return res.status(404).json({ errors: "Wish list not found." });
			}
			await foundWishList.destroy();
			res.json({
				message: "Delete Successful",
				deleted_id: wishlistId,
			});
		} catch (err) {
			next(err);
		}
	})
);

router.post(
	"/:wishlistId",
	requireAuth,
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

router.delete(
	"/:wishlistId/:listingId",
	asyncHandler(async (req, res, next) => {
		try {
			const listingId = parseInt(req.params.listingId, 10);
			const wishlistId = parseInt(req.params.wishlistId, 10);
			const foundWishList = await WishListListing.findOne({ where: { listingId, wishlistId } });
			if (!foundWishList) {
				return res.status(404).json({ errors: "Listing not found." });
			}
			await foundWishList.destroy();
			res.json({
				message: "Delete Successful",
				deleted_id: foundWishList.id,
			});
		} catch (err) {
			next(err);
		}
	})
);

module.exports = router;
