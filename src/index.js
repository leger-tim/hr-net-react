// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import "./index.css";

// Get the root element where the app will be mounted
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
