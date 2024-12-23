import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionHistory from "../components/TransactionHistory";
import { setWalletData } from "../features/walletSlice";
import { setScreenName } from "../features/activeScreenSlice";

// Validation schema using Yup
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .min(1, "Minimum amount to add is ₹1"),
});

export default function Wallet() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const endpoint = useSelector((state) => state.endpoint.endpoint);
  const [calculatedEarnings, setCalculatedEarnings] = useState(0);
  const walletBalance = useSelector((state) => state.wallet.walletBalance);
  const transactions = useSelector((state) => state.wallet.transactions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${endpoint}/addmoney`,
        { amount: values.amount },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      dispatch(setWalletData(response.data.wallet));
      toast.success("Money added successfully!");
      console.log("Adding money:", values.amount);

      resetForm();
      setCalculatedEarnings(0);
    } catch (error) {
      toast.error("Error adding money. Please try again.");
      console.error("Error adding money:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEarnings = (amount) => {
    if (amount >= 1000) {
      return (amount * 0.05).toFixed(2);
    }
    return 0;
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    dispatch(setScreenName("wallet"));
  }, []);
  return (
    <Container maxWidth="m">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Money to Wallet
        </Typography>

        <Formik
          initialValues={{ amount: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            dirty,
          }) => (
            <Form>
              <Box mb={3}>
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Amount (₹)"
                  variant="outlined"
                  fullWidth
                  value={values.amount}
                  onChange={(e) => {
                    handleChange(e);
                    setCalculatedEarnings(calculateEarnings(e.target.value));
                  }}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Box>

              <Box mb={3}>
                {values.amount >= 1000 ? (
                  <Typography
                    variant="body1"
                    color="success.main"
                    align="center"
                  >
                    You will earn 5% of ₹{values.amount}, which is ₹
                    {calculatedEarnings}.
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    color="warning.main"
                    align="center"
                  >
                    Add ₹1000 or more to earn 5% from your wallet balance.
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!dirty || !isValid || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Money"}
              </Button>
            </Form>
          )}
        </Formik>

        {userInfo && (
          <Box mt={3}>
            <Typography variant="body1" align="center">
              Current Wallet Balance: ₹{walletBalance.toLocaleString("en-IN")}
            </Typography>
          </Box>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </Box>
      {transactions.length > 0 && <TransactionHistory />}
    </Container>
  );
}
