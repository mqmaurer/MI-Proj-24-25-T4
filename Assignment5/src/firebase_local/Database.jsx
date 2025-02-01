import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import firebaseApp from "./FB_App";

function Database() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const database = getFirestore(firebaseApp);
  const collectionRef = collection(database, "testbooks");

 
  useEffect(() => {
    updateData();
  }, []);

 
  const updateData = async () => {
    setisLoading(true);
   //setTimeout(() => { //testen der Ladezeit
    try{ 
     onSnapshot(collectionRef, (querySnapshot) => {
      const displayItem = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(displayItem);    
  });
}catch (error) {  }
finally { 
  setisLoading(false);
  };
//}, 500);
};

  // Funktion zum Hinzufügen eines Buches
  const addBook = async (newBook) => {
    try {
      // Überprüfen, ob die ISBN bereits existiert
      const existingBook = data.find(book => book.isbn === newBook.isbn);
      if (existingBook) {
        throw new Error("There already exists a book with this ISBN!");
      }
  
      await addDoc(collectionRef, newBook);
      console.log("Book added successfully!");
      updateData(); // Nach dem Hinzufügen direkt aktualisieren
      return { success: true, message: "Book added successfully!" }; // Erfolg zurückgeben
    } catch (error) {
      console.error("Error adding book:", error.message);
      return { success: false, message: error.message }; // Fehler zurückgeben
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

  const updateRating = async (bookId, rating) => {
    const database = getFirestore(firebaseApp);
    const bookRef = doc(database, "testbooks", bookId);
  
    try {
      await updateDoc(bookRef, { rating });
      console.log(`Buch mit ID ${bookId} wurde erfolgreich bewertet!`);
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Bewertung:", error);
    }
  };

  return { data, addBook, deleteBook, updateData, isLoading, updateRating };
}

export default Database;
