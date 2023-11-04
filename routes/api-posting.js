const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/make-article.js");
const uploadImage = require("../modules/upload-image.js")


//register the article in the database.
router.post("/writeArticle",  upload.array("imageFile"), async function (req, res) {
  //userId
  const userId = 2;
  const images = req.files;
  const firstImage = images[0];

  uploadImage.linkImageToArticle(images, userId, firstImage);
  const title = req.body.title;
  
  // await uploadImage.linkImageToArticle(imageData, userId);
  const content = req.body.article;
  await postArticle.createPost(userId, content, title);
 

  const message = `Article Uploaded!`;

  res.setToastMessage(message);
  res.redirect("/");
});


module.exports = router;