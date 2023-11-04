const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
const getArticle = require("../modules/read-article.js");
const uploadImage = require("../modules/upload-image.js")

//render the page with editor and all stored details loaded
router.get("/editArticle", async function (req, res) {
  let articleId = req.query.postID;
  let article = await getArticle.retrieveArticle(articleId);
  res.locals.article = await article;
  res.render("editing");
});



module.exports = router;