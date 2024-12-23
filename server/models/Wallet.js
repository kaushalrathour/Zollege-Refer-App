const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
    min: 0,
  },
  transactions: {
    type: Array,
    default: [],
  },
});

module.exports = model("Wallet", walletSchema);
