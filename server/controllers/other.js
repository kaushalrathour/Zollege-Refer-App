const Wallet = require("../models/Wallet");
const ExpressError = require("../helpers/ExpressError");
const { StatusCodes } = require("http-status-codes");
const Earning = require("../models/Earning");
const User = require("../models/User");

module.exports.addMoney = async (req, res) => {
  // console.log("Amount", req.body);
  const currentUser = req.user;
  let wallet = await Wallet.findById(currentUser._id);
  const { amount } = req.body;
  if (!amount) {
    throw new ExpressError(StatusCodes.BAD_REQUEST, "Amount is required");
  }

  if (amount <= 0) {
    throw new ExpressError(
      StatusCodes.BAD_REQUEST,
      "Minimum amount should be 1 or more"
    );
  }

  const transaction = {
    type: "credit",
    amount,
    transactionDate: new Date(Date.now()),
    balanceAfterTransaction: wallet.walletBalance + amount,
    balanceBeforeTransaction: wallet.walletBalance,
  };

  wallet.walletBalance += amount;
  wallet.transactions.push(transaction);
  if (amount >= 1000) {
    await Earning.create({
      user: currentUser._id,
      amountEarned: amount * 0.05,
      type: "self_earnings",
      refereeUsername: "Self",
    });

    if (currentUser.referredBy) {
      const levelOneReferrer = await User.findOne({
        referralCode: currentUser.referredBy,
      });

      if (levelOneReferrer) {
        await Earning.create({
          user: levelOneReferrer._id,
          amountEarned: amount * 0.05,
          type: "level_1_referral",
          refereeUsername: currentUser.username,
        });

        if (levelOneReferrer.referredBy) {
          const levelTwoReferrer = await User.findOne({
            referralCode: levelOneReferrer.referredBy,
          });
          if (levelTwoReferrer) {
            await Earning.create({
              user: levelTwoReferrer._id,
              amountEarned: amount * 0.01,
              type: "level_2_referral",
              refereeUsername: currentUser.username,
            });
          }
        }
      }
    }
  }

  await wallet.save();

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Added Money In Wallet", wallet });
};
