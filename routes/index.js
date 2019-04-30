/*
 * Connect all of your endpoints together here.
 */

module.exports = function (app, router, passport) {
  app.use("/api", require("./home.js")(router));

  var user = require("../controllers/userController");
  var car = require("../controllers/carController");
  var post = require("../routes/postController");
  var comment = require("../controllers/commentController");
  var rate = require("../controllers/rateController");

  //User functions
  app.route("/api/users/register").post(user.create_a_user);
  app
    .route("/api/users/login")
    .post(passport.authenticate('local'), user.auth_a_user);
  app.route("/api/users/logout").post(passport.authenticate('local'), user.log_out_user);
  app.route("/api/users/:userId")
    .post(user.update_a_user)
    .get(user.findUserById);
  app.route("/api/users/delete/:userId").delete(user.delete_a_user);


  //car function

  app
    .route("/api/cars/createCar")
    //.post(passport.authenticate('local'), car.createCar);
    .post(car.createCar);
  app
    .route("/api/cars")
    .get(car.findCars)
  app
    .route("/api/car/:carId")
    .get(car.findCarById)
    .put(passport.authenticate('local'), car.updateCarById)
    .delete(passport.authenticate('local'), car.deleteCarById);
  //post function
  app
    .route("/api/posts/createPost")
    .post(post.createPost);
  app
    .route("/api/posts")
    .get(post.findPostsWithCar);
  app
    .route("/api/post/:postId")
    //    .put(passport.authenticate('local'), post.updatePostById)
    .put(post.updatePostById)
    .delete(passport.authenticate('local'), post.deletePostById);

  //Rate function
  app
    .route("/api/rates/createRate")
    .post(rate.createRate)
  app
    .route("/api/rates/:rateId")
    .put(rate.updateRateById)
    .delete(rate.deleteRateById)



};