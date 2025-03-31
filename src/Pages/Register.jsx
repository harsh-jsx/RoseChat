import React from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [user] = useAuthState(auth, auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, "users", userId), {
        email: email,
        password: password,
        createdAt: new Date(),
        username: "",
        profilePic: "",
        coverPic: "",
        about: "",
        phone: "",
        status: "Hey there! I am using RoseChat.",
        OnBordingHogyi: false,
        isVerfied: false,
        isOnline: true,
        isTyping: false,
        isActive: true,
        isBlocked: false,
        isDeleted: false,
        isAdmin: false,
        isPremium: false,
      });
      toast.success("Registration successful!");
      location.href = "/"; // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please use a Login.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check your email.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Weak password. Please use a stronger password.");
      }
    }
  };

  return (
    <div className="RegisterContainer flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
            Register
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <a href="/forgot-password" className="text-blue-500">
            Forgot Password?
          </a>
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
