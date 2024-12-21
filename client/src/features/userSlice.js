import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
