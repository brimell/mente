import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@utils/firebaseInit';
import { getThisWeeksMoodAverage } from '../utils/firestore';
import localforage from 'localforage';

interface Mood {
  id: string;
  date: string;
  mood: string;
}

export interface MainContextProps {
  db: any; // Adjust type accordingly
  moods: Mood[];
  currentUser: User | null;
  averageMood: number;
  code?: any; // Adjust type accordingly
  setCode: React.Dispatch<React.SetStateAction<any>>; // Adjust type accordingly
  ouraAccessToken?: any; // Adjust type accordingly
  setOuraAccessToken: React.Dispatch<React.SetStateAction<any>>; // Adjust type accordingly
}

async function getUserFromStorage(): Promise<User | null> {
  const user = await localforage.getItem('currentUser') as string | null;
  if (user) return JSON.parse(user) as User; // Cast user to User type
  return null;
}

export const MainContext = createContext<MainContextProps | null>(null);

const MainContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [averageMood, setAverageMood] = useState<number>(0);
  const [code, setCode] = useState<any>();
  const [ouraAccessToken, setOuraAccessToken] = useState<any>();

  useEffect(() => {
    getUserFromStorage().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  // firebase useEffect

  useEffect(() => {
    console.log('currentUser', currentUser);
    const fetchMoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moods'));
        const fetchedMoods: Mood[] = [];
        querySnapshot.forEach((doc) => {
          const { id, date, mood } = doc.data(); // Destructure the data object
          fetchedMoods.push({ id, date, mood }); // Include the missing properties
        });
        setMoods(fetchedMoods);
      } catch (error) {
        console.error('Error fetching moods:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed', user);
      setCurrentUser(user); // Update current user state
      localforage.setItem('currentUser', JSON.stringify(user));
    });

    fetchMoods();

    // Clean up
    return () => {
      unsubscribe(); // Unsubscribe from auth state changes
      // Cleanup code if needed
    };
  }, [db, auth]);

  // app-view functions

  useEffect(() => {
    if (currentUser) {
      getThisWeeksMoodAverage(currentUser.uid).then(({ averageMood }) => {
        setAverageMood(Number(averageMood.toFixed(1)));
      });
    }
  }, [currentUser]);

  return (
    <MainContext.Provider
      value={{
        db,
        moods,
        currentUser,
        averageMood,
        code,
        setCode,
        ouraAccessToken,
        setOuraAccessToken,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
