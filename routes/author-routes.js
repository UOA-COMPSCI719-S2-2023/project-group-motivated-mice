const express = require("express");
const router = express.Router();

// The DAO that handles CRUD operations for users.
//const accountDao = require("../modules/test-dao.js");
const accountDao = require("../modules/account-dao.js");

// Define route for view another user's profile.
router.get("/profile/:userId", async function (req, res) {
    // Get the user ID from the URL
    const userId = req.params.userId; 

    // Retrieve the user's profile information from the database using the DAO.
    //const user = await accountDao.retrieveUserById(userId);
    const user = await accountDao.retrieveAccountById(userId);

    if (user) {
        // Render a view with the user's profile information.
        res.render("view-author", { user });
    } else {
        // Handle the case where the user is not found (e.g., display a 404 page).
        res.status(404).render("notFound");
    }
});

module.exports = router;


