import React, { createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const FirebaseContext =
	createContext<firebase.firestore.Firestore | null>(null);

export const useFirebase = () => {
	const firebaseInstance = useContext(FirebaseContext);
	if (!firebaseInstance) {
		throw new Error("useFirebase must be used within a FirebaseProvider");
	}
	return firebaseInstance;
};

const FirebaseProvider: React.FC = ({ children }) => {
	const db = firebase.firestore();

	return (
		<FirebaseContext.Provider value={db}>
			{children}
		</FirebaseContext.Provider>
	);
};

export default FirebaseProvider;
