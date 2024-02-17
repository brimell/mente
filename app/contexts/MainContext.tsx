import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	Firestore,
	getFirestore,
	collection,
	getDocs,
} from "firebase/firestore";

interface Mood {
	id: string;
	date: string;
	mood: string;
}

interface MainContextType {
	db: Firestore;
	moods: Mood[];
}

export const MainContext = createContext<MainContextType | null>(null);

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

const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [moods, setMoods] = useState<Mood[]>([]);

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

		fetchMoods();

		// Clean up
		return () => {
			// Cleanup code if needed
		};
	}, [db]);

	const contextValue: MainContextType = {
		db,
		moods,
	};

	return (
		<MainContext.Provider value={contextValue}>
			{children}
		</MainContext.Provider>
	);
};

export default MainContextProvider;
