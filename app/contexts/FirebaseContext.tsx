import React, { createContext, useContext } from "react";
import firebase from "firebase/app";
import { app } from "../firebaseConfig";

export const FirebaseContext = createContext<firebase.firestore.Firestore | null>(
  null
);

export const useFirebase = () => {
  const firebaseInstance = useContext(FirebaseContext);
  if (!firebaseInstance) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return firebaseInstance;
};

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
