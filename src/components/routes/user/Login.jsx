import React, { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase.config";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/", { replace: true });
    } catch {
      setError(
        "Account not found. Please make sure you have entered the correct email address."
      );
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto h-full max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold">Log In</h2>
        {error && (
          <div
            className="relative mb-5 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              ref={emailRef}
              required
              placeholder="Email"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
              placeholder="Password"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="w-100 mt-3 text-center ">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>{" "}
          or
        </div>
        <div className="w-100 text-center">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
