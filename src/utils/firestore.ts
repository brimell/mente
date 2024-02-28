import { db, auth } from './firebaseInit';
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  DocumentReference,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth'; // Import the 'User' type from the 'firebase/auth' module

// mood stuff

interface MoodData {
  mood: number;
  timestamp: Date;
  user: string;
}

interface MoodResult {
  lastSubmittedDate: Date | undefined;
  mood: number | undefined;
}

interface MoodAverageResult {
  averageMood: number | null;
  weeklyMoods: number[];
}

interface MoodStreakResult {
  averageMood: number;
  count: number;
}

export const addMoodToFirestore = async (
  mood: number,
  currentUser: User,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
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

export const getLastMoodSubmission = async (
  currentUser: User | null
): Promise<MoodResult | null> => {
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

export const updateMoodInFirestore = async (
  docId: string,
  moodData: Partial<MoodData>
): Promise<void> => {
  const docRef = doc(db, 'moods', docId);
  try {
    await updateDoc(docRef, moodData);
    console.log('Document updated with ID: ', docId);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const deleteMoodFromFirestore = async (docId: string): Promise<void> => {
  const docRef = doc(db, 'moods', docId);
  try {
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', docId);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
export const getMoodsInRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<(MoodData & DocumentData)[]> => {
  const q = query(
    collection(db, 'moods'),
    where('user', '==', userId),
    where('timestamp', '>=', startDate),
    where('timestamp', '<=', endDate),
    orderBy('timestamp', 'desc')
  );
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      mood: doc.data().mood,
      timestamp: doc.data().timestamp,
      user: doc.data().user,
      ...doc.data()
    }));
  } catch (e) {
    console.error('Error fetching documents: ', e);
    return [];
  }
};

export const getWeeklyMoodData = async (userId: string): Promise<MoodAverageResult> => {
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

export const getThisWeeksMoodAverage = async (userId: string): Promise<MoodStreakResult> => {
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
    console.log(data);
    totalMood += parseInt(data.mood);
    count++;
  });

  const averageMood = count > 0 ? totalMood / count : 0;

  // Return the average mood for the week and the count of submissions
  return { averageMood, count };
};

export const calculateMoodStreaks = async (userId: string): Promise<number> => {
  const q = query(
    collection(db, 'moods'),
    where('user', '==', userId),
    orderBy('timestamp', 'desc')
  );

  const querySnapshot = await getDocs(q);
  let streak = 0;
  let lastDate: number | null = null;

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

// integration stuff

export const fetchUserEnabledIntegrations = async () => {
  if (auth.currentUser) {
    const userIntegrationsDocRef = doc(db, "userIntegrations", auth.currentUser.uid);
    const docSnap = await getDoc(userIntegrationsDocRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data().enabledIntegrations;
    }
  }
  return []; // Return an empty array if no data exists or 'auth.currentUser' is null
};

export const updateUserEnabledIntegrations = async (enabledIntegrations: string[]) => {
  if (auth.currentUser) {
    const userIntegrationsDocRef = doc(db, "userIntegrations", auth.currentUser.uid);
    await setDoc(userIntegrationsDocRef, { enabledIntegrations }, { merge: true });
  }
};

export const fetchIntegrationStatus = async (integrationId: string): Promise<boolean> => {
  const docRef: DocumentReference<DocumentData> = doc(db, "integrations", integrationId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.enabled ?? false; // Use nullish coalescing to default to false if undefined
  }
  return false; // Return false if the document does not exist
};

export const updateIntegrationStatus = async (integrationId: string, enabled: boolean): Promise<void> => {
  const docRef: DocumentReference<DocumentData> = doc(db, "integrations", integrationId);
  await setDoc(docRef, { enabled }, { merge: true });
};