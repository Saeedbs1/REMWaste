import React from "react";
import ReactDOM from "react-dom/client";
import SkipPage from "./pages/SkipPage";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    transition: background-color 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
  }
  
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input, textarea {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    cursor: text;
  }

  button, a {
    cursor: pointer;
  }
  
  body.dark-mode {
    background-color: rgb(18, 18, 18) !important;
    color: #fff;
  }

  body.dark-mode .MuiPopover-paper {
    background-color: #1a1a1a !important;
    color: #fff !important;
  }
`;
document.head.appendChild(globalStyles);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SkipPage />
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
