import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvI_2EFtgagck0jiuaJE2nKT3SGrRts-o",
  authDomain: "rosechat-f38b8.firebaseapp.com",
  projectId: "rosechat-f38b8",
  storageBucket: "rosechat-f38b8.firebasestorage.app",
  messagingSenderId: "1076638429838",
  appId: "1:1076638429838:web:8ee521a88b604cc93acfdf",
  measurementId: "G-0Y1VDTRXTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { database, auth };
