import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Mood } from '../types';

// Define types for context data
interface FirebaseDataContextType {
  firestore: firebase.firestore.Firestore | null;
  addMood: (mood: Mood) => void;
  deleteMood: (id: string) => void;
  moods: Mood[];
}

// Create Firebase Data Context
const FirebaseDataContext = createContext<FirebaseDataContextType | null>(null);

// Custom hook to access Firebase data and functions
export const useFirebaseData = () => {
  const firebaseData = useContext(FirebaseDataContext);
  if (!firebaseData) {
    throw new Error('useFirebaseData must be used within a FirebaseDataProvider');
  }
  return firebaseData;
};

// Firebase Data Provider component
export const FirebaseDataProvider: React.FC = ({ children }) => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    const unsubscribe = firestore.collection('moods').onSnapshot(snapshot => {
      const fetchedMoods: Mood[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        fetchedMoods.push({ id: doc.id, ...data });
      });
      setMoods(fetchedMoods);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [firestore]);

  const addMood = async (mood: Mood) => {
    try {
      await firestore.collection('moods').add(mood);
    } catch (error) {
      console.error('Error adding mood: ', error);
    }
  };

  const deleteMood = async (id: string) => {
    try {
      await firestore.collection('moods').doc(id).delete();
    } catch (error) {
      console.error('Error deleting mood: ', error);
    }
  };

  const contextValue: FirebaseDataContextType = {
    firestore,
    addMood,
    deleteMood,
    moods
  };

  return (
    <FirebaseDataContext.Provider value={contextValue}>
      {children}
    </FirebaseDataContext.Provider>
  );
};
