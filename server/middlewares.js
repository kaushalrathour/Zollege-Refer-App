const wrapAsync = require("./helpers/wrapAsync");
const User = require("./models/User");
const { newUserSchema } = require("./schema");
const ExpressError = require("./helpers/ExpressError");
const { StatusCodes } = require("http-status-codes");
const verifyToken = require("./helpers/verifyToken");

module.exports.doesUserExist = wrapAsync(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    console.log("User", user);
    throw new ExpressError(StatusCodes.OK, "User Not Found");
    res.status(404).json({ status: "fail", message: "User Not Found" });
    return;
  }
  next();
});

module.exports.doesreferralExist = wrapAsync(async (req, res, next) => {
  const { referredBy } = req.body;
  if (!referredBy) return next();
  const user = await User.findOne({ referralCode: referredBy });
  if (!user) {
    console.log("Invalid Referral Code");
    throw new ExpressError(StatusCodes.BAD_REQUEST, "Invalid Referral Code");
  }
  req.referrer = {
    username: user.username,
    name: user.name,
    _id: user._id,
  };
  next();
});

module.exports.doesUserExist = wrapAsync(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findByUsername(username);
  if (!user) {
    throw new ExpressError(StatusCodes.NOT_FOUND, "User Not Found");
  }
  next();
});

module.exports.isLoggedIn = wrapAsync(async (req, res, next) => {
  let token =
    (req.headers && req.headers["authorization"]) ||
    req.headers["Authorization"] ||
    "No Token";
  if (!token || token.length < 7) {
    throw new ExpressError(
      StatusCodes.NO_CONTENT,
      "Authorization Token is Required"
    );
  }
  token = token.replace(/^Bearer\s+/i, "");
  console.log("Token: ", token);
  const user = await verifyToken(token);

  if (!user) {
    console.log("No User");
    throw new ExpressError(StatusCodes.UNAUTHORIZED, "User Not Logged In");
  }
  req.user = user;
  next();
});

module.exports.validateNewUser = (req, res, next) => {
  const { username, email, name, password, referredBy } = req.body;
  const { error, value } = newUserSchema.validate({
    username,
    email,
    password,
    name,
    referredBy,
  });
  if (error) {
    console.error("Validation Error:", error);
    throw new ExpressError(StatusCodes.BAD_REQUEST, error.message);
  }
  return next();
};
