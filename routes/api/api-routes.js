const express = require("express");
const router = express.Router();

router.use("/location", require("./location-api-routes.js"));

module.exports = router;