import React from "react";
import Sidebar from "../components/Sidebar";
import MainSide from "../components/MainSide";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ToDoApp() {
  return (
    <div className="relative">
      <div className="flex h-screen justify-between overflow-hidden text-lightBlack">
        <Sidebar />
        <MainSide />
      </div>
    </div>
  );
}

export default ToDoApp;
