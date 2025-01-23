import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { firebaseApp } from './firebase_local/FB_App.jsx';
import App from './App.jsx'
import './assets/css/bootstrap.default.css';

// Initialize Firebase
firebaseApp();

// Initialize the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default firebaseApp;