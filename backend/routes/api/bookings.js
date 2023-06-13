const express = require('express');
const asyncHandler = require('express-async-handler');

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

router.delete('/:bookingId', asyncHandler(async (req, res) => {
    const bookingToDelete = await Booking.findByPk(req.params.bookingId);

    if (!bookingToDelete) {
        res.status(404);
        return res.json({ errors: ['Booking not found.'] })
    }

    await bookingToDelete.destroy();

    return res.json({ message: 'successfully deleted' })
}));


router.post('/', asyncHandler(async (req, res) => {
    const { userId, totalCost, avePricePerDay, paymentConfirmed, startDate, endDate, listingId } = req.body;

    const listing = await Listing.findByPk(listingId);

    if (!listing) {
        res.status(404);
        return res.json({ errors: ['No listing found.'] });
    }

    const foundListiings = await Booking.findAll({
        where: {
            startDate: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            },
            endDate: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        }
    });

    if (foundListiings.length) {
        res.status(401);
        return res.json({ errors: ['These dates are already booked.'] })
    }

    const booking = await Booking.create({
        userId,
        totalCost,
        avePricePerDay,
        paymentConfirmed,
        startDate,
        endDate,
        listingId
    });

    return res.json(booking);
}));

module.exports = router;
