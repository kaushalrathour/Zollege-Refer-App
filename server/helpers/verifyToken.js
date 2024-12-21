const User = require("../models/User");

module.exports.verifyToken = async (token) => {
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(_id);
    if (user) {
      console.log("Verified User: ", user.username);
      return user;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (err) {
    console.log("Token verification failed", err);
    return null;
  }
};
