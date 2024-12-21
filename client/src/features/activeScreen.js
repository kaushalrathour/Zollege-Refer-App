import { createSlice } from "@reduxjs/toolkit";

const activeScreenSLice = createSlice({
  name: "screenName",
  initialState: {
    screenName: "Home",
  },
  reducers: {
    setScreenName: (state, action) => {
      state.screenName = action.payload;
    },
  },
});

export const { setScreenName } = activeScreenSLice.actions;

export default activeScreenSLice.actions;
