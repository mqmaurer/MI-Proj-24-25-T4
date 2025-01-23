import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { firebaseApp } from './firebase_local/FB_App.jsx';
import App from './App.jsx'

// Initialize Firebase
firebaseApp();

// Initialize the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)