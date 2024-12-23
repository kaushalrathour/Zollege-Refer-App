import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Container from "./Container";

export default function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
