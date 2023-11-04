const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const accountDAO = require("../modules/account-dao.js");
const locationDAO = require("../modules/location-dao.js");






router.get("/",async function(req, res) {
    if(req.cookies.authToken){
    res.locals.loggedIn = "true";
    res.locals.title = "Verified user!";
    res.locals.allTestData = await testDao.retrieveAllTestData();
    }
    else{
    res.locals.title = "NOT VERIFIED";
    res.locals.loggedIn = null;
    }

    res.render("home");
  
  });
    
router.get("/location", async function(req, res) {

    res.locals.title = "Locations";
    res.locals.allLocations = await locationDAO.retrieveAllLocations();
    res.locals.topLocations = await locationDAO.retrieveTopLocations();
    res.render("location");
});

router.use("/api", require("./api/api-routes.js"));





const registerRoutes = require("./register-routes.js");
router.use(registerRoutes);

//routes
const userAccountRoutes = require("./user-routes.js")
router.use(userAccountRoutes);

module.exports = router;