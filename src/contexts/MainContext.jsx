import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Firestore, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../utils/firebaseInit';

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
  const [moods, setMoods] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    console.log('currentUser', currentUser)
    const fetchMoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moods'));
        const fetchedMoods = [];
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
    });

    fetchMoods();

    // Clean up
    return () => {
      unsubscribe(); // Unsubscribe from auth state changes
      // Cleanup code if needed
    };
  }, [db, auth]);

  return <MainContext.Provider value={{ db, moods, currentUser }}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
