import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Auth from "./screens/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./screens/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/userSlice";
import Wallet from "./screens/Wallet";
import { setWalletData } from "./features/walletSlice";
import ReferAndEarn from "./screens/ReferAndEarn";
import { setEarning } from "./features/earningSlice";
import { useState } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import { socket } from "./socket.io";
import YourReferrals from "./screens/YourReferrals";
import { setReferrals } from "./features/referralSlice";
export default function Container() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const earning = useSelector((state) => state.earning.earning);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const walletData = localStorage.getItem("walletData");
    const earning = localStorage.getItem("earning");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
    if (walletData) {
      dispatch(setWalletData(JSON.parse(walletData)));
    }
    if (earning) {
      dispatch(setEarning(JSON.parse(earning)));
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      socket.connect();

      return () => {
        socket.disconnect();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      socket.emit("fetchData", userInfo.token);

      socket.on("dataFetched", (data) => {
        const { wallet, earning, referrals } = data;
        if (wallet) {
          dispatch(setWalletData(wallet));
        }
        if (earning) {
          dispatch(setEarning(earning));
        }
        if (referrals) {
          dispatch(setReferrals(referrals));
        }
      });

      return () => {
        socket.off("dataFetched");
      };
    }
  }, [userInfo, earning]);
  if (isLoading) return <LoadingIndicator />;
  return (
    <Router>
      <div className="container">
        <Header />
        <div
          style={{
            flex: 1,
            overflow: "scroll",
            scrollbarWidth: "none",
            padding: 10,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {!isLoggedIn && (
              <>
                <Route path="/auth" element={<Auth />} />
                <Route path="/refer/:referralCode" element={<Auth />} />
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/refer" element={<ReferAndEarn />} />
                <Route path="/referrals" element={<YourReferrals />} />
              </>
            )}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
