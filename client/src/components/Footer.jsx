import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 MyReferralApp. All Rights Reserved.
      </Typography>
      <Box sx={{ marginTop: "0.5rem" }}>
        <MuiLink
          component={Link}
          to="/terms"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            margin: "0 0.5rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Terms & Conditions
        </MuiLink>
        |
        <MuiLink
          component={Link}
          to="/privacy"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            margin: "0 0.5rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Privacy Policy
        </MuiLink>
      </Box>
      <Box sx={{ marginTop: "0.5rem" }}>
        <MuiLink
          component={Link}
          to="/help-center"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            margin: "0 0.5rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Help Center
        </MuiLink>
        |
        <MuiLink
          component={Link}
          to="/faq"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            margin: "0 0.5rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          FAQs
        </MuiLink>
      </Box>
    </Box>
  );
}
