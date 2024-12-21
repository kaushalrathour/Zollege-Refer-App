import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Auth from "./screens/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./screens/NotFound";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
export default function Container() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  return (
    <Router>
      <div className="container">
        <Header />
        <div style={{ flex: 1, overflow: "scroll", padding: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
