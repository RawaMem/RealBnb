const router = require('express').Router();
const { googleMapsAPIKey, mapboxAccessToken } = require('../../config');


router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

router.post('/accessToken', (req, res) => {
  res.json({ mapboxAccessToken })
})

module.exports = router;
