const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const articleDAO = require("../modules/article-dao.js")
const uploadImage = require("../modules/image-dao.js")
const accountDb = require("../modules/account-dao");

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");



// render an article
router.get("/entry/:id", async function (req, res) {
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}
  let submittedId = req.params[`id`];
  const article = await articleDAO.retrieveArticle(submittedId);
  res.locals.articleId = submittedId;
  res.locals.article = article;
  res.locals.articleEntry = true;

  const userID = await articleDAO.getUserByArticle(submittedId);
  const images = await articleDAO.getImagesFromId(submittedId);
  res.locals.images = images;
  res.locals.author = userID;
  res.render("article");

});

router.get("/posting", function (req, res) {
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}

  res.render("posting");
});

router.get("/deleteArticle", async function (req, res) {
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}
  let articleId = req.query.postID;

  // let article = await getArticle.retrieveArticle(articleId);
  await articleDAO.deletePrevImages(articleId);
  await articleDAO.deleteArticle(articleId);
  const message = `Content Deleted!`;

  res.setToastMessage(message);
  res.redirect("/");
});


//render the page with editor and all stored details loaded
router.get("/editArticle", async function (req, res) {
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}
  let articleId = req.query.postID;
  let article = await articleDAO.retrieveArticle(articleId);
  res.locals.article = await article;
  res.locals.articleID = articleId;

  res.render("editing");
});

//register the article in the database.
router.post("/writeArticle", upload.array("imageFile"), async function (req, res) {
  
  //userId
  const authToken = req.cookies.authToken;
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}

  // Retrieve the user object based on authToken
  const user = await accountDb.retrieveUserWithAuthToken(authToken);

  const userId = user.AccountID;
  const images = req.files;
  const firstImage = images[0];
  if (!(typeof firstImage === "undefined")) {
    uploadImage.linkImageToArticle(images, userId, firstImage);
  }
  const title = req.body.title;
  const content = req.body.article;
  await articleDAO.createPost(userId, content, title);
  const message = `Article Uploaded!`;
  res.setToastMessage(message);
  res.redirect("/");
});


router.post("/sendEdit", upload.array("imageFile"), async function (req, res) {
  //userId
  if(req.cookies.authToken){
    res.locals.loggedIn = "true";}
  const authToken = req.cookies.authToken;

  // Retrieve the user object based on authToken
  const user = await accountDb.retrieveUserWithAuthToken(authToken);
  const userId = user.AccountID;
  const title = req.body.title;
  const content = req.body.article;
  const images = req.files;
  const firstImage = images[0];


  let articleID = req.body.articleNumber;
  // let articleOfInterest = await getArticle.retrieveArticle(articleID);
  if (!(typeof firstImage === "undefined")) {
    await uploadImage.updateImageOfArticle(images, articleID, firstImage, userId)

  }
  await articleDAO.updateArticleDetails(articleID, title, content);
  // await postArticle.createPost(userId, content, title);


  const message = `Content Updated!`;

  res.setToastMessage(message);
  res.redirect("/");
});


module.exports = router;