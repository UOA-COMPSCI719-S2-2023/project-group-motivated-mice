const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const accountDAO = require("../modules/account-dao.js"); // needed for homepage additions
const locationDAO = require("../modules/location-dao.js");
const articleDAO = require("../modules/article-dao.js");






router.get("/", async function (req, res) {
  if (req.cookies.authToken) {
    res.locals.loggedIn = "true";
    res.locals.title = "Verified user!";
    res.locals.allTestData = await testDao.retrieveAllTestData();
  }
  else {
    res.locals.title = "NOT VERIFIED";
    res.locals.loggedIn = null;
  }

  res.render("home");

});

router.get("/location", async function (req, res) {
  if (req.cookies.authToken) {
    res.locals.loggedIn = "true";
  }

  res.locals.title = "Locations";
  res.locals.allLocations = await locationDAO.retrieveAllLocations();
  res.locals.topLocations = await locationDAO.retrieveTopLocations();
  res.render("location");

});

router.get("/author", async function (req, res) {
  if (req.cookies.authToken) {
    res.locals.loggedIn = "true";
  }

  res.locals.title = "Authors";
  res.locals.allAuthors = await accountDAO.retrieveAllAccounts();
  res.locals.topAuthors = await accountDAO.retrieveTopAccounts();
  res.render("view-author");

});

router.get("/gallery", async function (req, res) {
  const AuthToken = req.cookies.authToken;
  let user = "";
  if (req.cookies.authToken) {
    user = await accountDAO.retrieveUserWithAuthToken(AuthToken)
    res.locals.loggedIn = "true";
  }

  const articlesList = await articleDAO.retrieveAllArticles();
  const thumbnailList = await articleDAO.retrieveAllThumbnails();

  res.locals.articles = articlesList;
  res.locals.images = thumbnailList;

  if (await user !== "") {
    const userid = user.AccountID;
    const userArticles = await articleDAO.retrieveArticlesByUser(userid);
    res.locals.userArticles = userArticles;
  }

  res.render("gallery");
});




router.use("/api", require("./api/api-routes.js"));

module.exports = router;