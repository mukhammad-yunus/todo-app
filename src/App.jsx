import React from "react";
import ToDoApp from "./components/routes/ToDoApp";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/routes/user/SignUp";
import Login from "./components/routes/user/Login";
import UserName from "./components/routes/user/UserName";
import { useAuth } from "./contexts/AuthContext";
import Home from "./components/Home";
function App() {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("data");

  return (
    <>
      <Routes>
        <Route
          path="/"
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
