const express = require("express");
const router = express.Router();

const accountDb = require("../modules/account-dao");
const articleDb = require("../modules/article-dao");

// Route to handle the request when a user clicks on the "View profile" button 
router.get("/my-profile", async function (req, res) {
    const authToken = req.cookies.authToken;
    console.log(authToken)
    
    
    // Retrieve the user object based on authToken
    const user = await accountDb.retrieveUserWithAuthToken(authToken);
    
    
    if (user) {
        // If the user is authenticated via authToken, redirect to their personal page
        res.redirect(`/user${user.AccountID}`);
    } else {
        //  If authToken is not valid, redirect back to the login page
        res.redirect("/login");
    }
});

router.get("/user:userId",async function(req, res){
    const userId = req.params.userId;

    //fetch user data from database
    const user = await accountDb.retrieveAccountById(userId);
    const avatar = await accountDb.retrieveAvatarById(user.AvatarID);
    const articles = await articleDb.retrieveArticlesByUser(userId);
    const topArticles = await articleDb.retrieveTopArticles();

    res.render("user-account", {user, avatar, articles, topArticles});

});

module.exports = router;