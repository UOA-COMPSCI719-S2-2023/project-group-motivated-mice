const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));
const postingDAO = require("../modules/posting-dao.js")

router.get("/deleteArticle", async function (req, res) {
    let articleId = req.query.postID;
    
    // let article = await getArticle.retrieveArticle(articleId);
   await postingDAO.deletePrevImages(articleId);
   await postingDAO.deleteArticle(articleId);
    const message = `Content Deleted!`;

    res.setToastMessage(message);
    res.redirect("/");
  });

module.exports = router;