import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
  updateCurrentUser,
} from 'firebase/auth';
import { Firestore, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../utils/firebaseInit';

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
  const [moods, setMoods] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const registerUser = async (email, username, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      user.updateProfile({ displayName: username });

      console.log('User registered:', user);
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);

      console.log('User logged in:', user);
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  const setEmail = async (newEmail) => {
    try {
      await updateEmail(auth.currentUser, newEmail);
        updateCurrentUser(auth, auth.currentUser);
        console.log('Email updated to:', newEmail);
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  };

  function setDisplayName(newDisplayName) {
    updateProfile(auth.currentUser, { displayName: newDisplayName })
      .then(() => {
        updateCurrentUser(auth, auth.currentUser);
        console.log('Display name updated to:', newDisplayName);
      })
      .catch((error) => {
        console.error('Error updating display name:', error);
        throw error;
      });
  }

  function setPhotoURL(newPhotoURL) {
    updateProfile(auth.currentUser, { photoURL: newPhotoURL })
      .then(() => {
        updateCurrentUser(auth, auth.currentUser);
        console.log('Photo URL updated to:', newPhotoURL);
      })
      .catch((error) => {
        console.error('Error updating photo URL:', error);
        throw error;
      });
  }

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
        setPhotoURL,
        registerUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
