const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/make-article.js");
const uploadImage = require("../modules/upload-image.js");
const getArticle = require("../modules/read-article.js");

router.post("/sendEdit",  upload.array("imageFile"), async function (req, res) {
    //userId
    const userId = 2;
    const title = req.body.title;
    const content = req.body.article;

    let articleID = req.body.articleNumber;
    console.log("🚀 ~ file: api-sendEdit.js:19 ~ articleID:", articleID)
    let articleOfInterest = await getArticle.retrieveArticle(articleID);
    console.log("🚀 ~ file: api-sendEdit.js:23 ~ articleOfInterest:", articleOfInterest)
    // const images = req.files;
    // const firstImage = images[0];
    // if (!(typeof firstImage === "undefined")) {
    //   uploadImage.linkImageToArticle(images, userId, firstImage);
    // }
    // const title = req.body.title;

    // const content = req.body.article;
    // await postArticle.createPost(userId, content, title);
    // res.locals.title = title;
    // res.locals.articleEntry = true;
    // res.locals.content = content;
  
    const message = `Content Updated!`;
  
    res.setToastMessage(message);
    res.redirect("/");
  });
  module.exports = router;