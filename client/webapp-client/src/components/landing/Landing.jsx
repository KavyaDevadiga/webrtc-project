import React, { useCallback, useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/CurrentUserProvider";
import { useSocket } from "../../context/SocketProvider";
import { AUTH_URL } from "../../env";
import { isValidEmail } from "../../utils/util";

const Landing = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [error, setError] = useState("");

  const socket = useSocket();
  const { user, setUser } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.email) {
        setUser({
          currentEmail: user.email,
        });
        socket.emit("user:register", { currentEmail: user.email });
        navigate("/call");
      }
    }
  }, []);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ token, userId, name, email })
      );
      setCurrentEmail(email);
      socket.emit("user:register", { currentEmail: email });
    }
  }, [navigate, location]);

  const handleLogin = () => {
    window.location.href = `${AUTH_URL}/api/v1/auth/google/login`;
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
      <div className="mb-8 w-full max-w-md text-center">
        <label
          htmlFor="googleLogin"
          className="block text-sm font-semibold text-gray-700 mb-3"
        >
          Sign in with Google
        </label>
        <button
          id="googleLogin"
          className="flex items-center justify-center w-full gap-3 border border-gray-300 rounded-lg bg-white py-3 px-6 font-semibold shadow-md transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
          onClick={handleLogin}
        >
          <FcGoogle size={24} />
          <span className="text-gray-700">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Landing;
