const express = require("express");
const wrapAsync = require("../helpers/wrapAsync");
const { isLoggedIn } = require("../middlewares");
const router = new express.Router();
const otherController = require("../controllers/other");

router.post("/addmoney", isLoggedIn, wrapAsync(otherController.addMoney));

module.exports = router;
