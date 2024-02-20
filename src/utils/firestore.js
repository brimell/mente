import { db } from '../utils/firebaseInit';
import { addDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export const addMoodToFirestore = async (mood, currentUser, onSuccess, onError) => {
  try {
    const docRef = await addDoc(collection(db, 'moods'), {
      mood: mood,
      timestamp: new Date(),
      user: currentUser.uid,
    });
    console.log('Document written with ID: ', docRef.id);
    if (onSuccess) onSuccess();
  } catch (e) {
    console.error('Error adding document: ', e);
    if (onError) onError();
  }
};

export const getLastMoodSubmission = async (currentUser) => {
  if (!currentUser) return null;
  const q = query(
    collection(db, 'moods'),
    where('user', '==', currentUser.uid),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs[0]?.data();
  const lastSubmittedDate = data?.timestamp.toDate();
  return { lastSubmittedDate, mood: data?.mood };
};

export const updateMoodInFirestore = async (docId, moodData) => {
  const docRef = doc(db, 'moods', docId);
  try {
    await updateDoc(docRef, moodData);
    console.log('Document updated with ID: ', docId);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const deleteMoodFromFirestore = async (docId) => {
  const docRef = doc(db, 'moods', docId);
  try {
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', docId);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
export const getMoodsInRange = async (userId, startDate, endDate) => {
  const q = query(
    collection(db, 'moods'),
    where('user', '==', userId),
    where('timestamp', '>=', startDate),
    where('timestamp', '<=', endDate),
    orderBy('timestamp', 'desc')
  );
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Error fetching documents: ', e);
    return [];
  }
};
