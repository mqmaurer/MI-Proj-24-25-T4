import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // Firebase Config
  
  apiKey: "AIzaSyCgaMfxBjiMZuoE6dZPHMPE5ontVH-AwRY",
  authDomain: "ibooks-bcb55.firebaseapp.com",
  databaseURL:"https://ibooks-bcb55-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "ibooks-bcb55",
  storageBucket: "ibooks-bcb55.firebasestorage.app",
  messagingSenderId: "882579150432",
  appId: "1:882579150432:web:2611f7e092e88c86495505",
  measurementId: "G-W4D0DPWMKD"
    }

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    
export default firebaseApp;