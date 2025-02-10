import { initializeApp } from "firebase/app";
/**
 * @typedef {Object} FirebaseApp
 */

/**
 * Firebase configuration settings retrieved from environment variables.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
}

/**
 * Initializes and exports the Firebase application instance.
 * @type {FirebaseApp}
 */
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;