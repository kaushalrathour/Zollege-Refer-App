const Wallet = require("../models/Wallet");
const Earning = require("../models/Earning");
const { StatusCodes } = require("http-status-codes");
const { removeSpaces } = require("../helpers/removeSpaces");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.loginController = async (req, res) => {
  const { name, username, email, referrals, referralCode } = req.user;

  let referralUsers = [];
  if (referrals && referrals.length > 0) {
    referralUsers = await User.find(
      { _id: { $in: referrals } },
      { username: 1, registeredAt: 1, name: 1, _id: 0, referralCode: 1 }
    );
  }
  const token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
  const userInfo = {
    name,
    username,
    email,
    token,
    referralCode,
  };

  const wallet = await Wallet.findById(req.user._id);
  const earning = await Earning.find({ user: req.user._id });

  res.json({
    status: "success",
    message: "Login Successful",
    userInfo,
    referrals: referralUsers,
    wallet,
    earning,
  });
};

module.exports.registerController = async (req, res) => {
  let { name, username, email, password, referredBy } = req.body;
  username = removeSpaces(username.toLowerCase());
  let user = new User({ name, username, email, referredBy });
  user = await User.register(user, password);
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  const userInfo = {
    name,
    username,
    email,
    referralCode: user.referralCode,
    token,
  };
  const wallet = await Wallet.create({
    _id: user._id,
  });
  const earning = await Earning.find({ user: user._id });
  if (req.referrer) {
    const updated = await User.findByIdAndUpdate(
      req.referrer._id,
      { $push: { referrals: user._id } },
      { new: true }
    );
    //   console.log(updated);
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Registration Successful",
    userInfo,
    wallet,
    referrer: req.referrer || null,
    earning,
  });
};
