import React, { useEffect } from "react";
import "./App.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";
import { socket } from "./socket.io";
import Container from "./Container";

export default function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
