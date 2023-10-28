const express = require("express");
const router = express.Router();

const userDao = require("../modules/test-dao.js");

router.get("/create-account", function(req,res){
    res.render("create-account");
});

router.post("/create-account", async function(req,res){
    const userDetails = {
        "username": req.body.username,
        "password": req.body.password,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "birthday": req.body.birthday,
        "email": req.body.email,
        "des": req.body.des
    }

    await userDao.createAcountData(userDetails);

    res.redirect("/create-account");
});

module.exports = router;