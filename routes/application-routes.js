const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");
const accountDAO = require("../modules/account-dao.js");


router.get("/",async function(req, res) {
    if(req.cookies.authToken){
    res.locals.loggedIn = "true";
    res.locals.title = "Verified user!";
    res.locals.allTestData = await testDao.retrieveAllTestData();
    }
    else{
    res.locals.title = "NOT VERIFIED";
    res.locals.loggedIn = null;
    }

    res.render("home");
    

});

module.exports = router;