const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const locationDAO = require("../modules/location-dao.js");

router.get("/", async function(req, res) {

    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();

    res.render("home");
});

router.get("/location", async function(req, res) {

    res.locals.title = "Locations";
    res.locals.allLocations = await locationDAO.retrieveAllLocations();
    res.locals.topLocations = await locationDAO.retrieveTopLocations();
    res.render("location");
});





module.exports = router;