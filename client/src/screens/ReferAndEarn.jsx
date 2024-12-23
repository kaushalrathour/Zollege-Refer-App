import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import EarningHistory from "../components/EarningHistory";
import { setScreenName } from "../features/activeScreenSlice";

export default function ReferAndEarn() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const earning = useSelector((state) => state.earning.earning);
  const endpoint = useSelector((state) => state.endpoint.endpoint);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setScreenName("refer"));
  }, []);
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Refer & Earn
      </Typography>

      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Share your referral code and earn exciting rewards!
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Referral Code Section */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h6" gutterBottom>
          Your Referral Code
        </Typography>
        <Paper
          elevation={2}
          sx={{
            display: "inline-block",
            px: 3,
            py: 1,
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {userInfo.referralCode || "N/A"}
        </Paper>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              color="primary.main"
              gutterBottom
              fontWeight="bold"
            >
              5%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Commission on Referrals (₹1000+ purchase)
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box textAlign="center">
            <Typography
              variant="h5"
              color="secondary.main"
              gutterBottom
              fontWeight="bold"
            >
              1%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Commission on Referrals of Your Referrals (₹1000+ purchase)
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center">
        <Typography variant="body1" gutterBottom>
          Invite your friends and earn commissions for every successful
          purchase!
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          style={{
            alignItems: "center",
          }}
        >
          {`https://zollege-refer-app.vercel.app/${userInfo.referralCode}`}
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      {earning.length > 0 && <EarningHistory />}
    </Container>
  );
}
