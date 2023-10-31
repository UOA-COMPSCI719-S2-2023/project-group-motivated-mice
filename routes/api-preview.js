const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));
const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");
const jimp = require("jimp");

router.post("/uploadImage", upload.single("imageFile"), function (req, res) {
    const fileInfo = req.file;
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);
    res.redirect("/");
});

module.exports = router;