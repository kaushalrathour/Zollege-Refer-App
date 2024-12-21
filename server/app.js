const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const User = require("./models/User");
const morgan = require("morgan");
const wrapAsync = require("./helpers/wrapAsync");
const { removeSpaces } = require("./helpers/removeSpaces");
const jwt = require("jsonwebtoken");
const {
  validateNewUser,
  doesreferralExist,
  doesUserExist,
} = require("./middlewares");

app.use(cors("*"));
app.use(morgan("tiny"));

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post(
  "/login",
  doesUserExist,
  passport.authenticate("local", { failureMessage: true }),
  wrapAsync(async (req, res) => {
    const { name, username, email, referrals, referralCode } = req.user;
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.json({
      status: "success",
      message: "Login Successful",
      name,
      username,
      email,
      referrals,
      referralCode,
      token,
    });
  })
);

app.post(
  "/register",
  validateNewUser,
  doesreferralExist,
  wrapAsync(async (req, res) => {
    let { name, username, email, password, referredBy } = req.body;
    username = removeSpaces(username.toLowerCase());
    let user = new User({ name, username, email, referredBy });
    user = await User.register(user, password);

    if (req.referrer) {
      const updated = await User.findByIdAndUpdate(
        req.referrer._id,
        { $push: { referrals: user._id } },
        { new: true }
      );
      console.log(updated);
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Registration Successful",
      name,
      username,
      email,
      token,
      referrer: req.referrer || null,
    });
  })
);

app.use((err, req, res, next) => {
  const { message, status = 500 } = err;

  if (["invalid signature", "jwt malformed"].includes(message)) {
    return res.status(400).json({ status: "failed", message: "Invalid Token" });
  }

  if (message === "Unauthorized") {
    return res.json({
      status: "failed",
      message: "Please Enter Valid Password",
    });
  }

  if (message.includes("already registered")) {
    return res.status(409).json({
      status: "failed",
      message: "A user with the given username is already registered",
    });
  }

  if (err.code === 11000 && err.keyPattern?.email) {
    return res.status(409).json({
      status: "failed",
      message: "This email is already in use.",
    });
  }

  res.status(status).json({ status: "failed", message });
});

app.all("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Page Not Found" });
});

const server = app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", async (socket) => {
  console.log("Connection Established");
});

async function connectWithDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECTED WITH MONGODB");
  } catch (error) {
    console.error(`Error while connecting with MONGO: ${error.message}`);
  }
}

connectWithDB();
