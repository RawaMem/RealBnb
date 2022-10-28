const express = require('express');
const asyncHandler = require('express-async-handler');

const { Booking, Listing } = require('../../db/models');

const router = express.Router();

// get all bookings
router.get('/', asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    res.json(bookings);
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
