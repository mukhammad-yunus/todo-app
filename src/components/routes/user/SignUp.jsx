import React, { useRef, useState } from "react";
import { auth } from "../../../../firebase.config";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match, try again.");
    }

    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
      navigate("/name", { replace: true });
    } catch (error) {
      if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
        setError(
          "Email address is already in use. Please use a different email."
        );
      } else if (error.code == "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto h-full max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold"> Sign Up</h2>
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
              type="email"
              ref={emailRef}
              required
              placeholder="Email"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder="Password"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              ref={passwordConfirmRef}
              required
              placeholder="Password Confirmation"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="w-100 mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
