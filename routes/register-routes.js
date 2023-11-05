const express = require("express");
const router = express.Router();

const userDb = require("../modules/account-dao.js");
const { error } = require("console");

const bcrypt = require("bcrypt");
const saltRounds = 10; //Choose the complexity of the encryption

router.get("/create-account", function(req,res){
    res.render("create-account");
});

router.post("/create-account", async function(req,res){

    const username = req.body.username;
    const plainPassword = req.body.password;

    const hashedPassword = await hashPassword(plainPassword);

    const userDetails = {
        "username": username,
        "password": hashedPassword,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "birthday": req.body.birthday,
        "email": req.body.email,
        "des": req.body.des,
        "avatar": req.body.avatar
    }

    await userDb.createAcountData(userDetails);

    res.redirect("/login");
});

//To check if the input username exists
router.get("/check-username/:username", async function(req, res){
    try{
        const username = req.params.username;
        const result = await userDb.retrieveUserName(username);

        if(result){
            res.json({exists: true});
        }else{
            res.json({exists: false});
        }
    }catch{
        res.status(500).send(error.message);
    }
});

//the endpoint to get avatar data
router.get("/get-avatars",async function(req,res){
    try {
        const avatars = await userDb.retrieveAllAvatars(); // a function define to interact with the database
        res.json(avatars);
    } catch (error) {
        res.status(500).send('An error occurred while fetching avatars.');
    }
});

//password hashing and salting
async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = router;