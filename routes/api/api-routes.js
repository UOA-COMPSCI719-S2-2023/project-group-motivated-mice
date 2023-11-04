const express = require("express");
const router = express.Router();

router.use("/location", require("./location-api-routes.js"));
router.use("/author", require("./author-api-routes.js"));

module.exports = router;