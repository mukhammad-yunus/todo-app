import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataContextProvider } from "./contexts/DataContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DataContextProvider>
      <Router>
        <App />
      </Router>
    </DataContextProvider>
  </AuthProvider>
);
