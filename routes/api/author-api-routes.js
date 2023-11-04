const express = require("express");
const { retrieveAccountById } = require("../../modules/account-dao.js");
const { retrieveArticlesByUser } = require("../../modules/article-dao.js");
const router = express.Router();



router.get("/:AuthorID",async function (req, res) {
    const id = req.path.substring(1);
    const author = await retrieveAccountById(id);
    if (author){
    res.json(author);}
    else{
    res.sendStatus(404);}
  });

  router.get("/articles/:AccountID",async function (req, res) {
    const id = req.path.substring(10); 
    const articles = await retrieveArticlesByUser(id);
    if (articles){
    res.json(articles);}
    else{
    res.sendStatus(404);}
    
  });


module.exports = router;