const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/preview", function (req, res) {
    const userID = 1;
    res.locals.user = userID;
    res.setToastMessage("Image Uploaded!");
    let fileNames = fs.readdirSync("public/images/preview");
    res.locals.images = fileNames;

    res.render("posting");
});

module.exports = router;