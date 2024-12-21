import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <p>© 2024 MyReferralApp. All Rights Reserved.</p>
        <p>
          <Link to="/terms" className="footer-link">
            Terms & Conditions
          </Link>
          |
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="footer-section">
        <p>
          <Link to="/help-center" className="footer-link">
            Help Center
          </Link>
          |
          <Link to="/faq" className="footer-link">
            FAQs
          </Link>
        </p>
      </div>
    </footer>
  );
}
