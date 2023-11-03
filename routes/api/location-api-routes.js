const express = require("express");
const { retrieveLocationById } = require("../../modules/location-dao.js");
const { retrieveArticlesByLocationId } = require("../../modules/location-dao.js");
const router = express.Router();



router.get("/:LocationID",async function (req, res) {
    const id = req.path.substring(1);
    const location = await retrieveLocationById(id);
    if (location){
    res.json(location);}
    else{
    res.sendStatus(404);}
  });

  router.get("/articles/:LocationID",async function (req, res) {
    const id = req.path.substring(10); 
    const articles = await retrieveArticlesByLocationId(id);
    if (articles){
    res.json(articles);}
    else{
    res.sendStatus(404);}
    
  });


module.exports = router;
