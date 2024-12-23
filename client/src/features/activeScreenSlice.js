import { createSlice } from "@reduxjs/toolkit";

const activeScreenSlice = createSlice({
  name: "screenName",
  initialState: {
    screenName: "",
  },
  reducers: {
    setScreenName: (state, action) => {
      state.screenName = action.payload;
    },
  },
});

export const { setScreenName } = activeScreenSlice.actions;

export default activeScreenSlice.reducer;
