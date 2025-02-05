import { initializeApp } from "firebase/app";
/**
 * @typedef {Object} FirebaseApp
 */

/**
 * Firebase configuration settings retrieved from environment variables.
 * @type {Object}
 */

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

/**
 * Initializes and exports the Firebase application instance.
 * @type {FirebaseApp}
 */
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;