import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firbaseConfig";
import { useProduct } from "./ProductContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("shopizioUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return signOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem("shopizioUser");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem(
          "shopizioUser",
          JSON.stringify({
            email: user.email,
          })
        );
      } else {
        localStorage.removeItem("shopizioUser");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
