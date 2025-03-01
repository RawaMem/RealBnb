const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const listingsRouter = require("./listings.js");
const categoriesRouter = require("./categories.js");
const mapsRouter = require('./maps');
const asyncHandler = require('express-async-handler');
const { Booking } = require('../../db/models')
const reviewsRouter = require('./reviews')
const threadsRouter = require('./threads')
const wishListRouter = require("./wishlist");
const bookingRouter = require("./bookings.js")
const distanceMatrix = require("./distanceMatrix");

// // GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/listings", listingsRouter);

router.use("/categories", categoriesRouter);

router.use('/maps',mapsRouter);

router.use('/reviews',reviewsRouter);

router.use('/directMessageThreads', threadsRouter)

router.use("/wishlists", wishListRouter);

router.use("/bookings", bookingRouter);
router.use("/distanceMatrix", distanceMatrix);


router.get('/maps-key', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json(apiKey);
});





module.exports = router;
