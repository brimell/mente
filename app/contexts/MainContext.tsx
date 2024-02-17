"use client";
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
	Firestore,
	collection,
	getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebaseInit";

interface Mood {
	id: string;
	date: string;
	mood: string;
}

interface MainContextType {
	db: Firestore;
	moods: Mood[];
	currentUser: User | null; // Add current user information
}

export const MainContext = createContext<MainContextType>({ db: {} } as MainContextType);


const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [moods, setMoods] = useState<Mood[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchMoods = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "moods"));
				const fetchedMoods: Mood[] = [];
				querySnapshot.forEach((doc) => {
					const { id, date, mood } = doc.data(); // Destructure the data object
					fetchedMoods.push({ id, date, mood }); // Include the missing properties
				});
				setMoods(fetchedMoods);
			} catch (error) {
				console.error("Error fetching moods:", error);
			}
		};

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user); // Update current user state
		});

		fetchMoods();

		// Clean up
		return () => {
			unsubscribe(); // Unsubscribe from auth state changes
			// Cleanup code if needed
		};
	}, [db, auth]);

	return (
		<MainContext.Provider value={{ db, moods, currentUser }}>
			{children}
		</MainContext.Provider>
	);
};

export default MainContextProvider;
