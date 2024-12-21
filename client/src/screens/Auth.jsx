import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const TESTING_API_ENDPOINT = "http://localhost:5000";

export default function Auth() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Login", values);
      const response = await axios.post(
        `${TESTING_API_ENDPOINT}/login`,
        values
      );
      console.log("Login Successful", response.data);
      dispatch(setUser(response.data));
      navigate("/home");
      if (response.data?.status === "success") {
        toast.success(response.data.message || "Login Successful");
      }
    } catch (error) {
      console.error("Error While Logging In", error.response?.data);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const handleRegister = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Register", values);
      const response = await axios.post(
        `${TESTING_API_ENDPOINT}/register`,
        values
      );
      console.log("Registration Successful", response.data);
      dispatch(setUser(response.data));
      navigate("/home");
      if (response.data?.status === "success") {
        toast.success(response.data.message || "Registration Successful");
      }
    } catch (error) {
      console.error("Error While Registering", error.response?.data);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
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
          }),
    });
  }, [isLoginScreen]);

  return (
    <div className="auth-container">
      <ToastContainer />
      <h1>{isLoginScreen ? "Login" : "Register"}</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          name: "",
          referralCode: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          isLoginScreen ? handleLogin(values) : handleRegister(values);
        }}
      >
        {() => (
          <Form className="auth-form">
            <div className="form-field">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="form-input"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="form-input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="form-error"
              />
            </div>

            {!isLoginScreen && (
              <>
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="form-error"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="referralCode" className="form-label">
                    Referral Code (Optional):
                  </label>
                  <Field
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="referralCode"
                    component="div"
                    className="form-error"
                  />
                </div>
              </>
            )}

            <div className="form-action">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isLoginScreen
                  ? isSubmitting
                    ? "Logging in..."
                    : "Login"
                  : isSubmitting
                  ? "Registering..."
                  : "Register"}
              </button>
            </div>

            <p className="toggle-action">
              {isLoginScreen
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsLoginScreen(!isLoginScreen)}
              >
                {isLoginScreen ? "Register" : "Login"}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
