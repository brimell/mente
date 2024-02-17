import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your database URL
});

// Firestore CRUD Operations

export async function createDocument(collectionPath: string, documentData: any): Promise<string> {
  const docRef = await admin.firestore().collection(collectionPath).add(documentData);
  return docRef.id;
}

export async function readDocument(collectionPath: string, documentId: string): Promise<any> {
  const docSnapshot = await admin.firestore().collection(collectionPath).doc(documentId).get();
  if (docSnapshot.exists) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    throw new Error(`Document ${documentId} not found in collection ${collectionPath}`);
  }
}

export async function updateDocument(collectionPath: string, documentId: string, updateData: any): Promise<void> {
  await admin.firestore().collection(collectionPath).doc(documentId).update(updateData);
}

export async function deleteDocument(collectionPath: string, documentId: string): Promise<void> {
  await admin.firestore().collection(collectionPath).doc(documentId).delete();
}

// User Authentication Management

export async function createUser(email: string, password: string): Promise<string> {
  const userRecord = await admin.auth().createUser({
    email,
    password,
  });
  return userRecord.uid;
}

export async function deleteUser(uid: string): Promise<void> {
  await admin.auth().deleteUser(uid);
}
