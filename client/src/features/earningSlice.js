import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  earning: [],
};

const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {
    setEarning: (state, action) => {
      state.earning = action.payload;
      localStorage.setItem("earning", JSON.stringify(action.payload));
    },
    clearEarning: (state) => {
      state.earning = [];
      localStorage.removeItem("earning");
    },
  },
});

export const { setEarning, clearEarning } = earningSlice.actions;

export default earningSlice.reducer;
