const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));
const upload = require("../middleware/multer-uploader.js");
const imageUpload = require("../modules/upload-image.js");


router.post("/uploadImage", upload.single("imageFile"), function (req, res) {
    const fileInfo = req.file;
    imageUpload.linkImageToArticle(fileInfo);
    res.redirect("/");
});

module.exports = router;