const express = require('express');
const asyncHandler = require('express-async-handler');
require("dotenv").config()
const { Booking, Listing, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();


// get all user bookings
router.get('/userBooking', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userBookings = await Booking.findAll({
        where: {
            userId
        },
        attributes: {
            exclude: ["userId", "updatedAt"]
        },
        include: {
            model: Listing,
            include: {
                model: Image,
                where: {
                    preview: true
                },
                attributes: ["url"]
            },
            attributes: ["name"],
        }
    })

    const userBookingData = [];

    userBookings.forEach(data => {
        const dataJson = data.toJSON();
        const listingName = dataJson["Listing"].name;
        const listingImagePreview = dataJson["Listing"]["Images"][0].url;
        dataJson.listingName = listingName;
        dataJson.listingImagePreview = listingImagePreview;
        delete dataJson["Listing"]; 
        userBookingData.push(dataJson);
    });

    res.json(userBookingData)
}));

router.delete('/:bookingId', requireAuth, asyncHandler(async (req, res) => {
    const bookingToDelete = await Booking.findByPk(req.params.bookingId);

    if (!bookingToDelete) {
        res.status(404);
        return res.json({ errors: ['Booking not found.'] })
    }

    await bookingToDelete.destroy();

    return res.json({ message: 'successfully deleted' })
}));

router.get("/stripeConfig", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

router.post("/create-payment-intent", requireAuth, asyncHandler(async (req,res) => {
    const {totalCost, imageUrl, listingName, listingId } = req.body;
    try {
        // use paymentIntenets.create() to allow more flexibility
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: [
                {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: listingName,
                        images: [imageUrl]
                    },
                    unit_amount: Math.round(totalCost * 100)
                },
                quantity: 1
                }
            ],
            success_url: "http://localhost:3000/user-profile", 
            cancel_url: `http://localhost:3000/listings/${listingId}`,
        });

        res.json({
            stripePaymentId: session.id,
            url: session.url
        });
        } catch (error) {
            res.status(400).json({
                error: {
                  message: error.message,
                },
            });
        };
}));

router.post('/create', requireAuth, asyncHandler(async (req, res) => {
    const { totalCost, avePricePerDay, startDate, endDate, listingId, numOfGuests, stripePaymentIntentId } = req.body;
    
    const userId = req.user.id;

    const listing = await Listing.findByPk(listingId);


    if (!listing) {
        res.status(404);
        return res.json({ errors: ['No listing found.'] });
    }

    try {
        const booking = await Booking.create({
            userId,
            listingId,
            totalCost,
            avePricePerDay,
            numOfGuests,
            startDate,
            endDate,
            stripePaymentIntentId   
        });

        return res.json({booking});

    } catch (error) {
        return res.status(400).send({
            error: {
                message: error.message,
            },
        });
    };
}));

module.exports = router;
