import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../features/userSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="header-logo">
        <h1>MyReferralApp</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {(isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  dispatch(clearUser());
                }}
              >
                <Link className="nav-link">Logout</Link>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link to="/auth" className="nav-link">
                  Login / Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
