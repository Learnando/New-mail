import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import "./i18n"; // ✅ Import the i18n config
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }));
