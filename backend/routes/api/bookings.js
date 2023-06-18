const express = require('express');
const asyncHandler = require('express-async-handler');
require("dotenv").config()
const Sequelize = require('sequelize');
const { Booking, Listing, Image, User } = require('../../db/models');
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


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

router.post("/create-payment-intent", async (req,res) => {
    console.log("req.body", req.body)

    const {userId, totalCost, imageUrl, listingName, avePricePerDay, numOfGuests, startDate, endDate, listingId} = req.body;

    const newBooking = await stripe.customers.create({
        metadata: {
            userId,
            listingId,
            totalCost,
            avePricePerDay,
            numOfGuests,
            startDate,
            endDate
        }
    });

    try {
        // use paymentIntenets.create() to allow more flexibility
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            customer: newBooking.id,
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
            success_url: `http://localhost:3000/user-bookings/${userId}`, 
            cancel_url: `http://localhost:3000/edit-listing/${listingId}`,
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
});

// This is the Stripe CLI webhook secret for testing endpoint locally.
let endpointSecret;

endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
    const sig = request.headers['stripe-signature'];

    let data;
    let eventType;

    if(endpointSecret) {
        let event;
        
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log("webhook verified")
        } catch (err) {
            console.log("webhook failed", `Webhook Error: ${err.message}`)
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = request.body.object;
        eventType = request.body.type;
    };
    
    // Handle the event
    let booking;
    if(eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer)
        .then((customer) => {
                const bookingData = customer.metadata
                booking = Booking.create({
                    userId:+bookingData.userId,
                    listingId:+bookingData.listingId,
                    totalCost:+bookingData.totalCost,
                    avePricePerDay:+bookingData.avePricePerDay,
                    numOfGuests: +bookingData.numOfGuests,
                    startDate:bookingData.startDate,
                    endDate:bookingData.endDate
                });
            }
        ).catch(err => console.log("err from checkout sessiont", err.message))
    };

    if(booking) {
        console.log("booking successful created")
    };
}
);
  

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

// get booking by bookingId
router.get("/:bookingId/detail", requireAuth, asyncHandler(async(req, res) => {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId, {
        include: [
            {
            model: Listing,
            attributes: ["longitude", "latitude"],
            }
        ]
    });

    if(!booking) res.status(404).json({errors: ["Booking not found."]});

    const listingId = booking.listingId;
    const listing = await Listing.findByPk(listingId);

    const listingOwner = await listing.getUser({attributes: ["username"]});

    const bookingToJson = booking.toJSON();
    bookingToJson.listingLng = bookingToJson.Listing.longitude;
    bookingToJson.listingLat = bookingToJson.Listing.latitude;
    delete bookingToJson.Listing;
    bookingToJson.listingHostUsername = listingOwner.username;

    res.json(bookingToJson);
}));

module.exports = router;
