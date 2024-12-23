import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment/moment";

export default function TransactionHistory() {
  const transactions = useSelector((state) => state.wallet.transactions);

  return (
    <Container maxWidth="m">
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>
          Transaction History
        </Typography>
        {transactions && transactions.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Transaction Date</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="right">Amount (₹)</TableCell>
                  <TableCell align="right">Balance Before (₹)</TableCell>
                  <TableCell align="right">Balance After (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .slice()
                  .reverse()
                  .map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        {moment(transaction.transactionDate).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ textTransform: "capitalize" }}
                      >
                        {transaction.type}
                      </TableCell>
                      <TableCell align="right">
                        ₹{transaction.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell align="right">
                        ₹
                        {transaction.balanceBeforeTransaction.toLocaleString(
                          "en-IN"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        ₹
                        {transaction.balanceAfterTransaction.toLocaleString(
                          "en-IN"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No transactions found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
