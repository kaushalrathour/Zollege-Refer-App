const express = require("express");
const router = new express.Router();
const wrapAsync = require("../helpers/wrapAsync");
const {
  doesUserExist,
  validateNewUser,
  doesreferralExist,
} = require("../middlewares");
const passport = require("passport");
const userController = require("../controllers/user");

router.post(
  "/login",
  doesUserExist,
  passport.authenticate("local", { failureMessage: true, failWithError: true }),
  wrapAsync(userController.loginController)
);

router.post(
  "/register",
  validateNewUser,
  doesreferralExist,
  wrapAsync(userController.registerController)
);

module.exports = router;
