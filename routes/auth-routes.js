const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

const userDb = require("../modules/test-dao.js"); // update this to the db when created

router.get("/login", function (req, res) {

    res.render("login");

});

router.post("/login", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const user = userDb.getUserWithCredentials(username, password);

    if (user) {

        // Auth success - make an auth token for the user, save it to the "database", set it as a cookie, and redirect the user.
        const authToken = uuid();
        user.authToken = authToken;
        res.cookie("authToken", authToken);
        res.locals.user = user;

        res.redirect("/");
    }
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentication failed!");
        res.redirect("./login");
    }
});

router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.setToastMessage("Successfully logged out!");
    res.redirect("./login");
});

module.exports = router;