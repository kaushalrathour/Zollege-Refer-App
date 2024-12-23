import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import moment from "moment";

export default function EarningHistory() {
  const earning = useSelector((state) => state.earning.earning);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>
          Earning History
        </Typography>
        <Divider sx={{ my: 3 }} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Referee</TableCell>
                <TableCell align="right">Amount Earned (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earning
                .slice()
                .reverse()
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">
                      {moment(item.date).format("dddd, MMMM Do YYYY")}
                    </TableCell>
                    <TableCell align="center">{item.type}</TableCell>
                    <TableCell align="center">
                      {item.refereeUsername === "Self"
                        ? "Self (You)"
                        : item.refereeUsername}
                    </TableCell>
                    <TableCell align="right">
                      ₹{item.amountEarned.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
