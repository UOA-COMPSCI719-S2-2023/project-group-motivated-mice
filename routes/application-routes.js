const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const accountDAO = require("../modules/account-dao.js"); // needed for homepage additions
const locationDAO = require("../modules/location-dao.js");
const articleDAO = require("../modules/article-dao.js");






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
    let articlesList = await articleDAO.retrieveAllArticles();
    const thumbnailList = await articleDAO.retrieveAllThumbnails();
  
    res.locals.articles = articlesList;
    res.locals.images = thumbnailList;
  
    //userid TODO fix the hardcoing on this 
  
    let userid = 1;
    if (userid) {
      let userArticles = await articleDAO.retrieveArticlesByUser(userid);
      res.locals.userArticles = userArticles;
    }
  
    res.render("gallery");
  });




  router.use("/api", require("./api/api-routes.js"));

module.exports = router;