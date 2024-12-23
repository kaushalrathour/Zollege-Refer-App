import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreenName } from "../features/activeScreenSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function YourReferrals() {
  const referrals = useSelector((state) => state.referral.referrals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScreenName("referrals"));
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Referrals
      </Typography>
      {referrals && referrals.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                <TableCell>
                  <strong>Registered At</strong>
                </TableCell>
                <TableCell>
                  <strong>Referral Code</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referrals
                .slice()
                .reverse()
                .map((referral, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {index + 1}. {referral.name}
                    </TableCell>
                    <TableCell>{referral.username}</TableCell>
                    <TableCell>
                      {new Date(referral.registeredAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{referral.referralCode}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No referrals to display.
        </Typography>
      )}
    </div>
  );
}
