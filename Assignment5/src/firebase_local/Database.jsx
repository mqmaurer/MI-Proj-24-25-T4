import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseConfig from "./FB_config";
import { initializeApp } from "firebase/app";

function Database() {
  const [data, setData] = useState([]);
  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);

  useEffect(() => {
    // Reference to the specific collection in the database
    const collectionRef = collection(database, "testbooks");
    console.log(collectionRef);

    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef); // Lesezugriff scheinbar verweigert, Code sollte funktionieren
        const displayItem = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(displayItem);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [database]);

  const addBook = async (newBook) => {
    const collectionRef = collection(database, "testbooks");

    try {
      await addDoc(collectionRef, newBook);
      console.log("Book added successfully!"); // TODO: Visuelle Erfolgsmeldung
    } catch (error) {
      console.error("Error adding book:", error); // TODO: Visuelle Fehlermeldung
    }
  };

  const deleteBook = async (bookId) => {
    const bookRef = doc(database, `testbooks/${bookId}`); // Pfad zum spezifischen Buch

    try {
      await deleteDoc(bookRef);
      console.log("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return { data, addBook, deleteBook }; // Gibt die Daten und die Funktion zurück
}

export default Database;