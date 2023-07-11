import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UserName() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { addName } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value
    }
    addName(data)
    navigate("/", {replace: true})
    setLoading(false)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto h-full max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold">Profile settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              ref={firstNameRef}
              required
              placeholder="Firstname"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              ref={lastNameRef}
              placeholder="Lastname (optional)"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserName;
