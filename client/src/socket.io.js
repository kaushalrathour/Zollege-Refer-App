import { io } from "socket.io-client";

const TESTING_API_ENDPOINT = "http://localhost:5000";

export const socket = io(TESTING_API_ENDPOINT, {
  autoConnect: false,
});
