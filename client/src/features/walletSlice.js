import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  walletBalance: 0,
  transactions: [],
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletData: (state, action) => {
      state.walletBalance = action.payload.walletBalance;
      state.transactions = action.payload.transactions;
      localStorage.setItem("walletData", JSON.stringify(action.payload));
    },
    clearWalletData: (state) => {
      state.walletBalance = 0;
      state.transactions = [];
      localStorage.removeItem("walletData");
    },
  },
});

export const { setWalletData, clearWalletData } = walletSlice.actions;

export default walletSlice.reducer;
