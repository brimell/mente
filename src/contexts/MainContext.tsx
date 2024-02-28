import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@utils/firebaseInit';
import * as authUtils from '../utils/auth';
import * as dbUtils from '../utils/firestore';
import axios from 'axios'; // Import Axios
import { getThisWeeksMoodAverage } from '../utils/firestore';

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
  const [moods, setMoods] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [rescueTimeData, setRescueTimeData] = useState([]);
  const [ouraData, setOuraData] = useState([]);
  const [averageMood, setAverageMood] = useState(0);
  const [code, setCode] = useState();
  const [ouraAccessToken, setOuraAccessToken] = useState();

  // firebase auth functions

  const registerUser = async (email, password) => authUtils.registerUser(email, username, password);
  const loginUser = async (email, password, setCurrentUser) =>
    authUtils.loginUser(email, password, setCurrentUser);
  const logoutUser = async (setCurrentUser) => authUtils.logoutUser(setCurrentUser);
  const resetPassword = async (email) => authUtils.resetPassword(email);
  const setEmail = async (newEmail) => authUtils.setEmail(newEmail, updateCurrentUser);
  const setDisplayName = async (newDisplayName) =>
    authUtils.setDisplayName(newDisplayName, updateCurrentUser);
  const setPhotoURL = async (newPhotoURL) => authUtils.setPhotoURL(newPhotoURL, updateCurrentUser);

  // firebase firestore functions

  const addMoodToFirestore = async (mood) => dbUtils.addMoodToFirestore(mood, currentUser);
  const getLastMoodSubmission = async (currentUser) => dbUtils.addMoodToFirestore(currentUser);

  // firebase useEffect

  useEffect(() => {
    console.log('currentUser', currentUser);
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

  // oura api functions

  // app-view functions

  useEffect(() => {
    if (currentUser) {
      getThisWeeksMoodAverage(currentUser.uid).then(({ averageMood }) => {
        setAverageMood(averageMood.toFixed(1));
      });
    }
  }, [currentUser]);

  return (
    <MainContext.Provider
      value={{
        db,
        moods,
        currentUser,
        loginUser,
        logoutUser,
        resetPassword,
        setDisplayName,
        setEmail,
        setPhotoURL,
        registerUser,
        addMoodToFirestore,
        getLastMoodSubmission,
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
