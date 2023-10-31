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

    res.locals.title = "Articles by location";
    res.locals.allLocations = await locationDAO.retrieveAllLocations();
    res.locals.topLocations = await locationDAO.retrieveTopLocations();
    res.locals.title = "Articles by location";
    const response = await locationDAO.retrieveLocationById("01");
    const response2= await locationDAO.retrieveArticlesByLocationId("01");
    const locationData = await response;
    console.log(locationData);
    const articlesByLocation = await response2;
    console.log(articlesByLocation);
    
    res.locals.locationDataName = locationData.Name;
    res.locals.locationDataDescription = locationData.Description;
    res.locals.articlesByLocation = articlesByLocation;
 
    res.render("location");
});






module.exports = router;