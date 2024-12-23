import { io } from "socket.io-client";

// const TESTING_API_ENDPOINT = "http://localhost:5000";
const PRODUCTION_API_ENDPOINT = "https://zollege-refer-app.onrender.com";

export const socket = io(PRODUCTION_API_ENDPOINT, {
  autoConnect: false,
});
