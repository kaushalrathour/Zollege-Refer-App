import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import activeScreen from "../features/activeScreen";

export const store = configureStore({
  reducer: {
    user: userSlice,
    activeScreen,
  },
});
