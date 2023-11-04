const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const fs = require("fs");
const upload = require("../middleware/multer-uploader.js");

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/make-article.js");
const uploadImage = require("../modules/upload-image.js")

router.get("/editArticle/:id", function (req, res) {
  let articleId = req.params['id'];

  res.render("editing");
});



module.exports = router;