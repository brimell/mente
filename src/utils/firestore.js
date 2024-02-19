import { db } from '../utils/firebaseInit';
import { addDoc, collection } from 'firebase/firestore';

export const addMoodToFirestore = async (mood, currentUser) => {
  try {
    const docRef = await addDoc(collection(db, 'moods'), {
      mood: mood,
      timestamp: new Date(),
      user: currentUser.uid,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
