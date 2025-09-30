import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { getUserProfile } from "../../Services/productService";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Function to create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //  Function to sign in a user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  const SignOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }
  // Function to check if a user is logged in
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setLoading(true);
    if (currentUser) {
      try {
        const profile = await getUserProfile(currentUser.uid);

        setUser({
          ...currentUser,
          role: profile?.role || "customer",
          displayName: profile?.displayName || currentUser.displayName,
          photoURL: profile?.photoURL || currentUser.photoURL,
          _id : profile?._id
        });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser({ ...currentUser, role: "customer" }); 
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const authInfo = {
    createUser,
    signInUser,
    user,
    setUser,
    loading,
    setLoading,
    SignOutUser,
    signInWithGoogle
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
