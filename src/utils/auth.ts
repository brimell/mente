import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User,
  AuthError,
  updateEmail,
} from 'firebase/auth';
import { auth } from './firebaseInit';

export const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });

    console.log('User registered:', user);
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error as AuthError;
  }
};

export const loginUser = async (
  email: string,
  password: string,
  setCurrentUser: (user: User | null) => void
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCredential.user);

    console.log('User logged in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error as AuthError;
  }
};

export const logoutUser = async (
  setCurrentUser: (user: null) => void
): Promise<void> => {
  try {
    await signOut(auth);
    setCurrentUser(null);
    console.log('User logged out');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error as AuthError;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error as AuthError;
  }
};

export const setEmail = async (
  newEmail: string,
  updateCurrentUser: (auth: any, user: User) => void
): Promise<void> => {
  try {
    await updateEmail(auth.currentUser!, newEmail); // Using non-null assertion since currentUser might be null
    updateCurrentUser(auth, auth.currentUser!);
    console.log('Email updated to:', newEmail);
  } catch (error) {
    console.error('Error updating email:', error);
    throw error as AuthError;
  }
};

export const setDisplayName = async (
  newDisplayName: string,
  updateCurrentUser: (auth: any, user: User) => void
): Promise<void> => {
  try {
    await updateProfile(auth.currentUser!, { displayName: newDisplayName });
    updateCurrentUser(auth, auth.currentUser!);
    console.log('Display name updated to:', newDisplayName);
  } catch (error) {
    console.error('Error updating display name:', error);
    throw error as AuthError;
  }
};

export const setPhotoURL = async (
  newPhotoURL: string,
  updateCurrentUser: (auth: any, user: User) => void
): Promise<void> => {
  try {
    await updateProfile(auth.currentUser!, { photoURL: newPhotoURL });
    updateCurrentUser(auth, auth.currentUser!);
    console.log('Photo URL updated to:', newPhotoURL);
  } catch (error) {
    console.error('Error updating photo URL:', error);
    throw error as AuthError;
  }
};
