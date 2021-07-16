import admin from 'firebase-admin';

const {
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_STORAGE_BUCKET,
} = process.env;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY,
        clientEmail: FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
    });
    admin.firestore().settings({
      ignoreUndefinedProperties: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export default admin;
