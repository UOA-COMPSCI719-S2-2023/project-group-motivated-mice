const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));
const upload = require("../middleware/multer-uploader.js");
const imageUpload = require("../modules/upload-image.js");

//Put uploaded images to the Preview folder so that the images could be rendered and user can choose one of them as the thumbnail
router.post("/uploadImage", upload.single("imageFile"), async function (req, res) {
    const fileInfo = req.file;
    const userID = 1;
    await imageUpload.linkImageToArticle(fileInfo, userID);

    res.redirect("/preview")
});

module.exports = router;