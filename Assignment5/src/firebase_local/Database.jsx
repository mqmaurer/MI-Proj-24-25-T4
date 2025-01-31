import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import firebaseApp from "./FB_App";

function Database() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const database = getFirestore(firebaseApp);
  const collectionRef = collection(database, "testbooks");

  // Funktion zum Laden der Daten
  const fetchData = async () => {
    try { 
      const querySnapshot = await getDocs(collectionRef);
      const displayItem = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(displayItem);
      console.log("Daten eingetragen!" + data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Lädt die Daten nur beim ersten Laden der Komponente
  useEffect(() => {
    console.log("Effect" + data);
    updateData();
    if(isLoading === false){
      console.log("Fertig!" + isLoading);
  };
  }, []);

  // Funktion zum manuellen Aktualisieren der Daten per Button
  const updateData = async () => {
    setisLoading(true);
   setTimeout(() => { //testen der Ladezeit
    try{ console.log("Lädt!" + isLoading);
     onSnapshot(collectionRef, (querySnapshot) => {
      const displayItem = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(displayItem);
      console.log("Daten eingetragen!" + displayItem);
    
  });
}catch (error) {  }
finally { 
  setisLoading(false);
  };
}, 200);
};

  // Funktion zum Hinzufügen eines Buches
  const addBook = async (newBook) => {
    try {
      await addDoc(collectionRef, newBook);
      console.log("Book added successfully!");
      updateData(); // Nach dem Hinzufügen direkt aktualisieren
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Funktion zum Löschen eines Buches
  const deleteBook = async (bookId) => {
    const bookRef = doc(database, `testbooks/${bookId}`);

    try {
      await deleteDoc(bookRef);
      console.log("Book deleted successfully!");
      updateData(); // Nach dem Löschen direkt aktualisieren
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return { data, addBook, deleteBook, updateData, isLoading };
}

export default Database;
