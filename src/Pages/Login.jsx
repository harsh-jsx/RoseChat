import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [user] = useAuthState(auth, auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      // Redirect to home page after successful login
      location.href = "/";
    } catch (error) {
      console.error("Error signing in:", error.code);
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email and password.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Wrong password. Please try again.");
      }
    }
  };

  return (
    <div className="LoginContainer flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <a href="/forgot-password" className="text-blue-500">
            Forgot Password?
          </a>
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
