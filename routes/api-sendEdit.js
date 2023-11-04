const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
// const postArticle = require("../modules/make-article.js");
const uploadImage = require("../modules/upload-image.js");
const postingDAO = require("../modules/posting-dao.js")

router.post("/sendEdit", upload.array("imageFile"), async function (req, res) {
  //userId
  const userId = 2;
  const title = req.body.title;
  const content = req.body.article;
  const images = req.files;
  const firstImage = images[0];
  

  let articleID = req.body.articleNumber;
  // let articleOfInterest = await getArticle.retrieveArticle(articleID);
  if (!(typeof firstImage === "undefined")) {
     await uploadImage.updateImageOfArticle(images, articleID, firstImage, userId)

  }
  await postingDAO.updateArticleDetails(articleID, title, content);
  // await postArticle.createPost(userId, content, title);


  const message = `Content Updated!`;

  res.setToastMessage(message);
  res.redirect("/");
});
module.exports = router;