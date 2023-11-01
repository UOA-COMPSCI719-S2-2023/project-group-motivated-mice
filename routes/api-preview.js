const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));
const postArticle = require("../modules/article-posting.js");
const upload = require("../middleware/multer-uploader.js");


router.post("/uploadImage", upload.single("imageFile"), function (req, res) {
    const fileInfo = req.file;
    postArticle.renameImage(fileInfo);
    
  
    res.redirect("/");
});

module.exports = router;