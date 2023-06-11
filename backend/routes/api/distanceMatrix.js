const router = require("express").Router();

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", async (req, res, next) => {
	try {
		const { token, coordinates, profile } = req.query;
		const response = await fetch(
			`https://api.mapbox.com/directions-matrix/v1/mapbox/${profile}/${coordinates}?approaches=curb;curb&access_token=${token}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		const data = await response.json();
		res.json({ distances: data.destinations });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
