import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth } from "./context/authContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { LangProvider } from "./context/langContext";
import { Theme } from "./context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth>
      <LangProvider>
        <Theme>
          <App />
        </Theme>
      </LangProvider>
    </Auth>
  </BrowserRouter>
);
