const express = require("express");
const router = express.Router();

const userDb = require("../modules/test-dao.js");
const { error } = require("console");

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

    await userDb.createAcountData(userDetails);

    res.redirect("/");
});

//To check if the input username exists
router.get("/check-username/:username", async function(req, res){
    try{
        const username = req.params.username;
        const result = await userDb.retrieveUserName(username);

        // console.log(result);

        if(result){
            res.json({exists: true});
        }else{
            res.json({exists: false});
        }
    }catch{
        res.status(500).send(error.message);
    }
});

module.exports = router;