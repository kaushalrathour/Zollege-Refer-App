import { createSlice } from "@reduxjs/toolkit";

// const TESTING_API_ENDPOINT = "http://localhost:5000";
const PRODUCTION_API_ENDPOINT = "https://zollege-refer-app.onrender.com";

const initialState = {
  // endpoint: TESTING_API_ENDPOINT,
  endpoint: PRODUCTION_API_ENDPOINT,
};
const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
});

export default endpointSlice.reducer;
