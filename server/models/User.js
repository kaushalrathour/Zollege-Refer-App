const { Schema, model } = require("mongoose");
const LocalMongoose = require("passport-local-mongoose");
const randomstring = require("randomstring");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  referredBy: String,
  referrals: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  registeredAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
  referralCode: {
    type: String,
    default: () => randomstring.generate(5),
  },
});

userSchema.plugin(LocalMongoose);

module.exports = model("User", userSchema);
