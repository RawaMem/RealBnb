const router = require("express").Router();

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", async (req, res, next) => {
	try {
		const { token, coordinates, profile } = req.query;
		if (!token || !coordinates || !profile) {
			return res.status(400).json({ message: "Missing required parameters." });
		}
		const response = await fetch(
			`https://api.mapbox.com/directions-matrix/v1/mapbox/${profile}/${coordinates}?&access_token=${token}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		const data = await response.json();
		res.json({ durations: data.durations });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
