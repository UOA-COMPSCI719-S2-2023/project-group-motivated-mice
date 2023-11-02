const userDb = require("../modules/account-dao.js");


function addUserToLocals(req, res, next) {
    const user = userDb.retrieveUserWithAuthToken(req.cookies.authToken);
    res.locals.user = user;
    next();
}

function verifyAuthenticated(req, res, next) {
    if (res.locals.user) {
        next();
    }
    else {
        res.redirect("./login");
    }
}

module.exports = {
    addUserToLocals,
    verifyAuthenticated
}