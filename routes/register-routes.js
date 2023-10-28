const express = require("express");
const router = express.Router();

// const testDao = require("../modules/test-dao.js");

router.get("/create-acount", function(req,res){
    res.render("create-acount");
});

// router.post("/create-acount", function(req,res){
//     const username = req.body.username;
//     const password = req.body.password;




// });

module.exports = router;