import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
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

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
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

export const updateEmail = async (newEmail) => {
  try {
    await updateEmail(auth.currentUser, newEmail);
    console.log('Email updated to:', newEmail);
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

export function setDisplayName(newDisplayName) {
  updateProfile(auth.currentUser, { displayName: newDisplayName })
    .then(() => {
      console.log('Display name updated to:', newDisplayName);
    })
    .catch((error) => {
      console.error('Error updating display name:', error);
      throw error;
    });
}

export function setPhotoURL(newPhotoURL) {
  updateProfile(auth.currentUser, { photoURL: newPhotoURL })
    .then(() => {
      console.log('Photo URL updated to:', newPhotoURL);
    })
    .catch((error) => {
      console.error('Error updating photo URL:', error);
      throw error;
    });
}