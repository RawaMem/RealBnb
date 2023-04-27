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

//get all threads related to user
router.get('/', restoreUser, asyncHandler(async (req, res) => {

    const userId = req.user.id
    const threads = await DirectMessageThread.findAll({
        where: {
            [Op.or]: [
                {hostId: userId},
                {guestId: userId}
            ]
        },
        include: DirectMessage
    })

    return res.json(threads)
}))



router.post('/', restoreUser, asyncHandler(async (req, res) => {

    const newThread = await DirectMessageThread.create(req.body)

    return res.json(newThread)
}))


router.delete('/:threadId', restoreUser, asyncHandler(async (req, res) => {

    const userId = req.user.id
    const threads = await DirectMessageThread.findAll({
        where: {
            [Op.or]: [
                {hostId: userId},
                {guestId: userId}
            ]
        }
    })

    return res.json(threads)
}))

router.get('/:threadId', restoreUser, asyncHandler(async (req, res) => {
    const threadId = req.params.threadId
    const userId = req.user.id
    const threads = await DirectMessageThread.findByPk(threadId, {
        include: DirectMessage
    } )
    // console.log('this is threads, looking for messages', threads)

    return res.json(threads.DirectMessages)
}))


module.exports = router;
