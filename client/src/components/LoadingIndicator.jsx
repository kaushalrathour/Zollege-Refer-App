import React from "react";
import { Rings } from "react-loader-spinner";

export default function LoadingIndicator() {
  return (
    <div
      className="loading-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Rings
        height="80"
        width="80"
        color="#3498db"
        radius="6"
        visible={true}
        ariaLabel="rings-loading"
      />
      <p style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
        Loading, please wait...
      </p>
    </div>
  );
}
