import { } from 'dotenv/config';
import { initializeApp } from "firebase/app";

const firebaseApp = () => {
    // Firebase Config
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }

    // Initialize Firebase
    const started = initializeApp(firebaseConfig);

    // Check Authentification status of the user
    started.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            const uid = user.uid;
            console.log("User is signed in with UID: ", uid);
        } else {
            // No user is signed in.
            console.log("No user is signed in.");
        }
    });
};

export default firebaseApp;