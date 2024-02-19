import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateCurrentUser,
  updateEmail,
} from 'firebase/auth';
import { auth } from './firebaseInit';

export const registerUser = async (email, username, password) => {
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

export const loginUser = async (email, password, setCurrentUser) => {
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

export const logoutUser = async (setCurrentUser) => {
  try {
    await signOut(auth);
    setCurrentUser(null);
    console.log('User logged out');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const setEmail = async (newEmail, updateCurrentUser) => {
  try {
    await updateEmail(auth.currentUser, newEmail);
    updateCurrentUser(auth, auth.currentUser);
    console.log('Email updated to:', newEmail);
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

export function setDisplayName(newDisplayName, updateCurrentUser) {
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

export function setPhotoURL(newPhotoURL, updateCurrentUser) {
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
