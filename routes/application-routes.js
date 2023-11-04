const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const accountDAO = require("../modules/account-dao.js");
const locationDAO = require("../modules/location-dao.js");
const articles = require("../modules/posting-dao.js");






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

router.get("/gallery", async function (req, res) {
    let articlesList = await articles.retrieveAllArticles();
    const thumbnailList = await articles.retrieveAllThumbnails();
  
    res.locals.articles = articlesList;
    res.locals.images = thumbnailList;
  
    //userid 
  
    let userid = 1;
    if (userid) {
      let userArticles = await articles.retrieveArticlesByUser(userid);
      res.locals.userArticles = userArticles;
    }
  
    res.render("gallery");
  });






module.exports = router;