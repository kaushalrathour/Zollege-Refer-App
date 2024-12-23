import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/userSlice";
import { clearWalletData } from "../features/walletSlice";
import { clearEarning } from "../features/earningSlice";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { clearReferrals } from "../features/referralSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const walletBalance = useSelector((state) => state.wallet.walletBalance);
  const screenName = useSelector((state) => state.activeScreen.screenName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearWalletData());
    dispatch(clearEarning());
    dispatch(clearReferrals());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to=""
          style={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          }}
        >
          Refer APP By Zollege
        </Typography>

        {isLoggedIn ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Welcome, {userInfo.name}</Typography>

            <Button
              color={"inherit"}
              sx={{
                color: screenName === "refer" ? "#ffb300" : "inherit",
                fontWeight: screenName === "refer" ? "bold" : "normal",
              }}
              component={Link}
              to="/refer"
            >
              Refer and Earn
            </Button>

            <Button
              color={"inherit"}
              sx={{
                color: screenName === "referrals" ? "#ffb300" : "inherit",
                fontWeight: screenName === "referrals" ? "bold" : "normal",
              }}
              component={Link}
              to="/referrals"
            >
              Your Referrals
            </Button>

            <Button
              color={"inherit"}
              sx={{
                color: screenName === "wallet" ? "#ffb300" : "inherit",
                fontWeight: screenName === "wallet" ? "bold" : "normal",
              }}
              component={Link}
              to="/wallet"
            >
              Wallet ₹{walletBalance.toLocaleString("en-IN")}
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              color: screenName === "auth" ? "#ffb300" : "inherit",
              fontWeight: screenName === "auth" ? "bold" : "normal",
            }}
            component={Link}
            to="/auth"
          >
            Login / Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
