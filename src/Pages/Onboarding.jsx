import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const storage = getStorage();
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const Onboarding = () => {
  const [user, loading, error] = useAuthState(auth, auth);

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
    const about = e.target[1].value.trim();
    const file = e.target[2].files[0];

    try {
      // Validate username with regex
      const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
      if (!usernameRegex.test(username)) {
        toast.error(
          "Username must be at least 3 characters long and can only contain letters, numbers, and underscores."
        );
        return;
      }

      // Check if username is unique
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const isUsernameTaken = querySnapshot.docs.some(
        (doc) => doc.data().username === username
      );

      if (isUsernameTaken) {
        toast.error(
          "Username is already taken. Please choose a unique username."
        );
      } else {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          toast.error("User is not authenticated.");
          return;
        }

        let imageUrl = null;

        // Upload image to Firebase Storage if a file is selected
        if (file) {
          const storageRef = ref(storage, `profileImages/${userId}`);
          const snapshot = await uploadBytes(storageRef, file);
          imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
            storage.app.options.storageBucket
          }/o/${encodeURIComponent(snapshot.metadata.fullPath)}?alt=media`;
        }

        // Save user data to Firestore
        await setDoc(doc(db, "users", userId), {
          username,
          about,
          imageUrl,
          OnboardingComplete: true,
        });

        toast.success("Onboarding completed successfully!");
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit1}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="About"
            className="border border-gray-300 rounded p-2"
            required
          />

          <input type="file" name="" accept="image/*" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Finish Onboarding
          </button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
