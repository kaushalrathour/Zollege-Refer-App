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
const userRoute = require("./routes/user");
const otherRoute = require("./routes/other");
const Wallet = require("./models/Wallet");
const Earning = require("./models/Earning");
const { verifyToken } = require("./helpers/verifyToken");

app.use(
  cors({
    origin: [
      "https://zollege-refer-app.vercel.app/",
      "https://zollege-refer-app.vercel.app",
      "https://zollege-refer-app.vercel.app/*",
    ],
    methods: ["GET", "POST"],
  })
);
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

app.use("/", userRoute);
app.use("/", otherRoute);

app.use((err, req, res, next) => {
  const { message = "An unexpected error occurred", status = 500 } = err;
  // console.log("error message", err);
  if (["invalid signature", "jwt malformed"].includes(message)) {
    return res.status(400).json({ status: "failed", message: "Invalid Token" });
  }

  if (message === "Unauthorized") {
    console.log("Unauthorized access attempt");
    return res.status(401).json({
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

  return res.status(status).json({ status: "failed", message });
});

app.all("*", (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: "failed", message: "Page Not Found" });
});

const server = app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://zollege-refer-app.vercel.app/",
      "https://zollege-refer-app.vercel.app",
      "https://zollege-refer-app.vercel.app/*",
    ],
  },
  pingTimeout: 60000,
});

io.on("connection", async (socket) => {
  console.log("Connection Established");
  try {
    socket.on("fetchData", async (token) => {
      const user = await verifyToken(token);
      let referrals = [];
      if (user) {
        if (user.referrals.length > 0) {
          referrals = await User.find({ _id: { $in: user.referrals } });
        }
        const earning = await Earning.find({ user: user._id });
        const wallet = await Wallet.findById(user._id);
        socket.emit("dataFetched", { earning, wallet, referrals });
      }
    });
  } catch (error) {
    console.log("Error");
  }
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
