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

export const getWeeklyMoodData = async (userId) => {
  const endOfWeek = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay()); // Adjust to the start of the week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
  endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day

  const q = query(
    collection(db, 'moods'),
    where('user', '==', userId),
    where('timestamp', '>=', startOfWeek),
    where('timestamp', '<=', endOfWeek),
    orderBy('timestamp', 'asc')
  );

  try {
    const querySnapshot = await getDocs(q);
    const weeklyMoods = querySnapshot.docs.map((doc) => doc.data().mood);
    const averageMood = weeklyMoods.reduce((acc, mood) => acc + mood, 0) / weeklyMoods.length;

    // Return both the average mood and the raw data for graphing or further analysis
    return { averageMood, weeklyMoods };
  } catch (e) {
    console.error('Error fetching weekly mood data: ', e);
    return { averageMood: null, weeklyMoods: [] };
  }
};

// Utility function to get the start of the current week (assuming week starts on Sunday)
const getStartOfWeek = (d = new Date()) => {
  const date = new Date(d);
  const day = date.getDay(); // Get current day of the week, Sun = 0, Mon = 1, ...
  const diff = date.getDate() - day; // Calculate difference to the start of the week

  return new Date(date.setDate(diff)).setHours(0, 0, 0, 0); // Return the start of the week
};

export const getThisWeeksMoodAverage = async (userId) => {
  const startOfWeek = getStartOfWeek();
  const now = new Date().setHours(23, 59, 59, 999); // End of the current day

  const moodRef = collection(db, 'moods');
  const q = query(
    moodRef,
    where('user', '==', userId),
    where('timestamp', '>=', new Date(startOfWeek)),
    where('timestamp', '<=', new Date(now)),
    orderBy('timestamp')
  );

  const querySnapshot = await getDocs(q);
  let totalMood = 0;
  let count = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    totalMood += data.mood; // Assuming mood is a numeric value
    count++;
  });

  const averageMood = count > 0 ? totalMood / count : 0;

  // Return the average mood for the week and the count of submissions
  return { averageMood, count };
};

export const calculateMoodStreaks = async (userId) => {
  const q = query(
    collection(db, 'moods'),
    where('user', '==', userId),
    orderBy('timestamp', 'desc')
  );

  const querySnapshot = await getDocs(q);
  let streak = 0;
  let lastDate = null;

  querySnapshot.forEach((doc) => {
    const submissionDate = doc.data().timestamp.toDate();
    const submissionDay = new Date(submissionDate).setHours(0, 0, 0, 0);

    if (lastDate === null) {
      lastDate = submissionDay;
      streak = 1;
    } else {
      const diffDays = (lastDate - submissionDay) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        return streak; // End loop if there's a gap of more than one day
      }
      lastDate = submissionDay;
    }
  });

  return streak;
};
