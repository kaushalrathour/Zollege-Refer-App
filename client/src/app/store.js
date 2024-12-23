import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import activeScreenSlice from "../features/activeScreenSlice";
import walletSlice from "../features/walletSlice";
import earningSlice from "../features/earningSlice";
import endpointSlice from "../features/endpointSlice";
import referralSlice from "../features/referralSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    activeScreen: activeScreenSlice,
    wallet: walletSlice,
    earning: earningSlice,
    endpoint: endpointSlice,
    referral: referralSlice,
  },
});
