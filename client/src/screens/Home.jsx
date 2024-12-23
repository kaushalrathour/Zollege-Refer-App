import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreenName } from "../features/activeScreenSlice";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(setScreenName("Home"));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Refer and Earn Platform
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary" align="center">
          This platform was developed as part of my assessment for the **Backend
          Developer** position at **Zollege**.
        </Typography>
      </Box>

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Typography variant="body1" align="center" color="textSecondary">
          The "Refer and Earn" platform allows users to refer others to join and
          earn rewards. It is designed to be scalable, reliable, and
          efficient—making it an ideal solution for user engagement in programs
          like those offered by Zollege.
        </Typography>
      </Box>

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Typography variant="body1" align="center" color="textSecondary">
          Zollege, as an innovative education portal, provides students with
          information on colleges, courses, entrance exams, and admissions.
          Their mission is to empower students to make informed decisions and
          navigate their educational journeys with ease.
        </Typography>
      </Box>

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        {isLoggedIn ? (
          <Link to="/refer">
            <Button variant="contained" color="primary">
              Go to Refer and Earn
            </Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button variant="contained" color="primary">
              Register / Log In
            </Button>
          </Link>
        )}
      </Box>

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" align="center" color="textSecondary">
          Learn more about Zollege at:{" "}
          <a
            href="https://zollege.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            zollege.in
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
