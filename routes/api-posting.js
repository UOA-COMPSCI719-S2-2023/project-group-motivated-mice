const express = require("express");
const router = express.Router();
let bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

const testDao = require("../modules/test-dao.js");
const postArticle = require("../modules/article-author.js");


router.get("/posting", function (req, res) {
    res.locals.articleEntry = true;
    res.render("posting");
});

router.post("/writeArticle", async function (req,res){
 const title = req.body.title;
 const userId = 1;
 const content = req.body.article;
 await postArticle.createPost(userId, content, title);
})
module.exports = router;