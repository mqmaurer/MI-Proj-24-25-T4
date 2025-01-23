import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase_local/Configuration.jsx';
import App from './App.jsx'
import './assets/css/bootstrap.default.css';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Check Authentification status of the user
firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    const uid = user.uid;
    console.log("User is signed in with uid: ", uid);
  } else {
    // No user is signed in.
    console.log("No user is signed in.");
  }
});

// Initialize the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default firebaseApp;