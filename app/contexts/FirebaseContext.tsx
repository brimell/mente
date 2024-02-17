"use client";
import React, { createContext } from "react";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

interface FirebaseContextType {
  db: Firestore;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{db}}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
