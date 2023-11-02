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
    


    const locationData = await locationDAO.retrieveLocationById("7");


    if (locationData){
    res.locals.articlesByLocation= await locationDAO.retrieveArticlesByLocationId("7");
    res.locals.title = locationData.Name;
    res.locals.locationDataName = locationData.Name;
    res.locals.locationDataDescription = locationData.Description;
    res.locals.locationLikes = locationData.Likes
    res.locals.longitude = locationData.Longitude
    res.locals.latitude = locationData.Latitude

    const weatherData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${res.locals.latitude}&lon=${res.locals.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=04a1f24d5b23131ed6fcb89c0e53be9a`);
    const weatherDatajson = await weatherData.json();
    res.locals.tempAtLocation = weatherDatajson.current.temp;
    res.locals.humidity = weatherDatajson.current.humidity;
    res.locals.windspeed = weatherDatajson.current.wind_speed;
    res.locals.uvindex= weatherDatajson.current.uvi;
    res.locals.cloudcover= weatherDatajson.current.clouds;
}
    res.render("location");
});





module.exports = router;