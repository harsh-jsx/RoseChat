import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [user, loading, error] = useAuthState(auth, auth);

  const handleLogout = () => {
    auth.signOut();
    location.href = "/login"; // Redirect to login page after logout
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log("User data:", userDoc.data());
          const userData = userDoc.data();
          const OnBordingHogyi = userData.OnBordingHogyi;
          if (OnBordingHogyi) {
            location.href = "/home"; // Redirect to home page if user data exists
          } else {
            location.href = "/onboarding"; // Redirect to onboarding page if user data does not exist
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      {loading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
          {user ? (
            <button onClick={handleLogout}>Signout</button>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
              <h1 className="text-2xl font-bold mb-4">Welcome to RoseChat</h1>
              <p className="text-lg">Please login or register to continue.</p>
              <a href="/login" className="text-blue-500 mt-4">
                Login
              </a>
              <a href="/register" className="text-blue-500 mt-4">
                Register
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
