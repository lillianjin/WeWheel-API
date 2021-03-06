// Get the packages we need
var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  secrets = require("./config/secrets"),
  bodyParser = require("body-parser"),
  passport = require("passport");

// import model
var User = require("./models/user"),
  Car = require("./models/car"),
  Post = require("./models/post"),
  Comment = require("./models/comment"),
  Rate = require("./models/rate");

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection, {
  useNewUrlParser: true
});

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);



// Use the body-parser package in our application
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '3mb'
  })
);
app.use(bodyParser.json({
  limit: '3mb'
}));

//

// Use passport middleware
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

// Use routes as a module (see index.js)
require("./routes")(app, router, passport);

// Start the server

app.listen(port);

console.log("Server running on port " + port);