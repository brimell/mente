"use client"
import React, { createContext, useContext } from "react";
import firebase from "firebase/app";
import { app } from "../firebaseConfig";

export const FirebaseContext = createContext<firebase.firestore.Firestore | null>(
  null
);


const FirebaseProvider: React.FC = ({ children }) => {
  // Get the Firestore instance from Firebase
  const db = firebase.firestore();

  return (
    <FirebaseContext.Provider value={db}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
