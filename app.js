/**
 * Main application file.
 * 
 * NOTE: This file contains many required packages, but not all of them - you may need to add more!
 */

// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Use the toaster middleware
app.use(require("./middleware/toaster-middleware.js"));


// Setup routes

app.use(require("./routes/application-routes.js"));

const authRouter = require("./routes/auth-routes.js");
app.use(authRouter);

const appRouter = require("./routes/application-routes.js");
app.use(appRouter);

const registerRouter = require("./routes/register-routes.js");
app.use(registerRouter);

const articleRoutes = require("./routes/article-routes.js");
app.use(articleRoutes);

const userAccountRoutes = require("./routes/user-routes.js")
app.use(userAccountRoutes);




// Start the server running.
app.listen(port, function () {
    console.log(`The Best App In The World ™️ listening on port ${port}!`);
});

app.use(express.static(path.join(__dirname, "js")));
