import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
    const { currentUser } = useAuth();
    const navigate = useNavigate()
  const data = [
    "https://images.unsplash.com/photo-1581668181500-08c6a6e006f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1536625979259-edbae645c7c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  ];
  const images = data.map((url, index) => {
    let cName = "";
    if (index == 0) {
      cName = "mb-[6rem]";
    } else if (index == 1) {
      cName = "mt-[2rem] mb-[2rem]";
    } else if (index == 2) {
      cName = "mt-[4rem]";
    }
    return (
      <img
      key={index}
        className={`w-1/3 rounded-xl object-cover ${cName}`}
        src={url}
        alt=""
      />
    );
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);
  
  return (
    <div className="container mx-auto flex flex-col-reverse p-5 lg:min-h-screen lg:flex-row lg:items-center lg:space-x-10 ">
      <div className="container mt-5 w-full space-y-4 lg:mt-0 lg:w-1/2 lg:space-y-8 ">
        <h1 className="text-3xl font-bold md:text-4xl">
          Organize and Simplify Your Day
        </h1>
        <p>
          Welcome to ToDo++Get organized and stay on top of your tasks with our
          powerful and user-friendly todo list web app. Experience a seamless
          workflow that helps you achieve more in less time.
        </p>
        <div className="flex w-full flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Link
            to="/signup"
            className="block cursor-pointer rounded bg-slate-500 py-2 text-center text-lg text-white hover:bg-slate-600 md:w-1/2"
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="block cursor-pointer rounded bg-slate-300 py-2 text-center text-lg hover:bg-slate-500 hover:text-white md:w-1/2"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="container flex w-full space-x-2 lg:w-1/2 ">{images}</div>
    </div>
  );
}

export default Home;
