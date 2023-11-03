// Import required modules
const express = require("express");
const router = express.Router();

// Define a route for the home page
router.get("/", function (req, res) {
    // Check if the user is logged in
    if (req.user) {
        // User is logged in, render the home page
        res.render("home", { user}); 
        // User is not logged in, redirect to the login page
        res.redirect("/login");
    }
});

// Export the router
module.exports = router;
