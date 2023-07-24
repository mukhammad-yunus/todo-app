import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ToDoApp, SignUp, Login, UserName, Home } from './pages'

function App() {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("data");

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={token ? <ToDoApp /> : <Navigate to="/home" />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/name" element={<UserName />} />
      </Routes>
    </>
  );
}

export default App;
