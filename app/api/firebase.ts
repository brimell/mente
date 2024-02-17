import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Initialize Firebase authentication
const auth = getAuth();

// Function to check if the user is logged in
export const checkUserLoggedIn = (callback: (isLoggedIn: boolean, userId: string | null) => void) => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      // User is logged in
      callback(true, user.uid);
    } else {
      // User is not logged in
      callback(false, null);
    }
  });
};