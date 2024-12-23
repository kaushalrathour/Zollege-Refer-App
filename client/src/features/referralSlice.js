import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  referrals: [],
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    setReferrals: (state, action) => {
      state.referrals = action.payload;
      localStorage.removeItem("referrals", JSON.stringify(action.payload));
    },
    clearReferrals: (state) => {
      state.referrals = [];
      localStorage.removeItem("referrals");
    },
  },
});

export const { setReferrals, clearReferrals } = referralSlice.actions;

export default referralSlice.reducer;
