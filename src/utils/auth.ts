import { signOut } from "firebase/auth"; 
import { auth } from "./firebaseInit"; 

export const logoutUser = async () => {
  try {
    
    await signOut(auth);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
