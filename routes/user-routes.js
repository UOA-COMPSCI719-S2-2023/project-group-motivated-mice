const express = require("express");
const router = express.Router();

const userDb = require("../modules/user-dao");

router.get("/:userId",async function(req, res){
    const userId = req.params.userId;

    //fetch user data from database
    const user = await userDb.retrieveAccountById(userId);
    const avatar = await userDb.retrieveAvatarById(user.AvatarID);
    const articles = await userDb.retrieveArticlesById(userId);
    const topArticles = await userDb.retrieveTopArticles();
    
    res.render("user-account", {user, avatar, articles, topArticles});

});

module.exports = router;