const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

router.get("/", async function(req, res) {

    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();

    res.render("home");
});


const registerRoutes = require("./register-routes.js");
router.use(registerRoutes);

//routes
const userAccountRoutes = require("./user-routes.js")
router.use(userAccountRoutes);

module.exports = router;