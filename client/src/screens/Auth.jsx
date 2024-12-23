import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setWalletData } from "../features/walletSlice";
import { setEarning } from "../features/earningSlice";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { setScreenName } from "../features/activeScreenSlice";
import { setReferrals } from "../features/referralSlice";

export default function Auth() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endpoint = useSelector((state) => state.endpoint.endpoint);
  const { referralCode = "" } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${endpoint}/login`, values);
      const { userInfo, wallet, earning, referrals } = response.data;
      // console.log(response.data);
      dispatch(setUser(userInfo));
      dispatch(setWalletData(wallet));
      dispatch(setEarning(earning));
      dispatch(setReferrals(referrals));
      navigate("/home");
      toast.success(response.data.message || "Login Successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (values) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${endpoint}/register`, values);
      const { userInfo, wallet, earning, referrals } = response.data;
      console.log(response.data);
      dispatch(setUser(userInfo));
      dispatch(setWalletData(wallet));
      dispatch(setEarning(earning));
      dispatch(setReferrals(referrals));
      navigate("/home");
      toast.success(response.data.message || "Registration Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      ...(isLoginScreen
        ? {}
        : {
            name: Yup.string()
              .max(30, "Name must be 30 characters or less")
              .required("Name is required"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
            referredBy: Yup.string().min(5).max(5).notRequired(),
          }),
    });
  }, [isLoginScreen]);

  useEffect(() => {
    if (referralCode) {
      setIsLoginScreen(false);
    }
  }, [referralCode]);
  useEffect(() => {
    dispatch(setScreenName("auth"));
  }, []);
  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        {isLoginScreen ? "Login" : "Register"}
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          name: "",
          referredBy: referralCode,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          isLoginScreen ? handleLogin(values) : handleRegister(values);
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <Box color="red" fontSize="0.875rem" mt={1}>
                      {msg}
                    </Box>
                  )}
                </ErrorMessage>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <Box color="red" fontSize="0.875rem" mt={1}>
                      {msg}
                    </Box>
                  )}
                </ErrorMessage>
              </Grid>

              {!isLoginScreen && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                    />
                    <ErrorMessage name="name">
                      {(msg) => (
                        <Box color="red" fontSize="0.875rem" mt={1}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <Box color="red" fontSize="0.875rem" mt={1}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="referredBy"
                      name="referredBy"
                      label="Referral Code (Optional)"
                      value={values.referredBy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      disabled={!!referralCode}
                    />
                    <ErrorMessage name="referredBy">
                      {(msg) => (
                        <Box color="red" fontSize="0.875rem" mt={1}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isLoginScreen
                    ? isSubmitting
                      ? "Logging in..."
                      : "Login"
                    : isSubmitting
                    ? "Registering..."
                    : "Register"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography align="center">
                  {isLoginScreen
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Button
                    color="secondary"
                    onClick={() => setIsLoginScreen(!isLoginScreen)}
                  >
                    {isLoginScreen ? "Register" : "Login"}
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
