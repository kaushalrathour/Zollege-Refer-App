const { Schema, model } = require("mongoose");

const earningsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amountEarned: {
      type: Number,
      min: 0,
    },
    type: String,
    refereeUsername: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Earning", earningsSchema);
