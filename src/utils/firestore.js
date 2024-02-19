import { addDoc } from "firebase/firestore";

export const addMoodToFirestore = async (mood, currentUser) => {
    try {
      await addDoc(collection(db, 'moods'), {
        mood: mood,
        timestamp: new Date(),
        user: currentUser.uid,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };