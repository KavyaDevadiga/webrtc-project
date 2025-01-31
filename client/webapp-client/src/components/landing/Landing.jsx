import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/CurrentUserProvider";
import { useSocket } from "../../context/SocketProvider";
import { isValidEmail } from "../../utils/util";

const Landing = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [error, setError] = useState("");

  const socket = useSocket();
  const { user, setUser } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.currentEmail) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user && user.currentEmail) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  const handleUserRegistered = useCallback((data) => {
    const { currentEmail } = data;
    setUser({ currentEmail });
    navigate(`/call`);
  }, []);
  const registerUser = () => {
    socket.emit("user:register", { currentEmail });
  };

  useEffect(() => {
    socket.on("user:registered", handleUserRegistered);
    return () => {
      socket.off("user:registered", handleUserRegistered);
    };
  }, [socket]);

  const handleEmailChange = (e) => {
    let val = e.target.value;
    if (!isValidEmail(val)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
    setCurrentEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-md">
          Secure Video Conferencing
        </h1>
        <p className="text-lg text-gray-700 mt-4 drop-shadow-sm">
          Let's connect and collaborate with ease
        </p>
      </div>
      <div className="mb-8 w-full max-w-md">
        <label
          htmlFor="currentEmail"
          className="block text-sm font-semibold text-gray-700 mb-3"
        >
          Enter Your Email
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <input
            id="currentEmail"
            type="email"
            value={currentEmail}
            onChange={handleEmailChange}
            className="px-4 py-3 outline-none w-full text-gray-700 focus:ring-0"
            placeholder="example@example.com"
          />
          <button
            className={`bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 
    ${
      !isValidEmail(currentEmail)
        ? "bg-gray-400 cursor-not-allowed"
        : "hover:bg-green-700"
    }`}
            disabled={!isValidEmail(currentEmail)}
            onClick={registerUser}
          >
            Submit
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Landing;
