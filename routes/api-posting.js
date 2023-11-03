const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/make-article.js");
const uploadImage = require("../modules/upload-image.js")

router.get("/posting", function (req, res) {

  res.render("posting");
});

//register the article in the database.
router.post("/writeArticle",  upload.array("imageFile"), async function (req, res) {
  const userId = 2;
  const images = req.files;
  uploadImage.linkImageToArticle(images, userId);
  const title = req.body.title;
  
  // await uploadImage.linkImageToArticle(imageData, userId);
  const content = req.body.article;
  await postArticle.createPost(userId, content, title);
  res.locals.title = title;
  res.locals.articleEntry = true;
  res.locals.content = content;

  const message = `Content Uploaded!`;

  res.setToastMessage(message);
  res.render("article");
});


module.exports = router;