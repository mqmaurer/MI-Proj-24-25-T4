import { useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import firebaseApp from "./FB_App";

/**
 * A custom hook to interact with a Firestore database for managing books.
 * @returns {{
 *   data: Array<Object>,
 *   addBook: Function,
 *   deleteBook: Function,
 *   updateData: Function,
 *   isLoading: boolean,
 *   updateRating: Function
 * }} An object containing functions and state variables for book management.
 */

function Database() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const database = getFirestore(firebaseApp);
  const collectionName = "testbooks";
  const collectionRef = collection(database, collectionName);

  useEffect(() => {
    updateData();
  }, []);

  /**
   * Function to update the local data state with the latest books from Firestore.
   * Sets isLoading to true during data fetch.
   */
  const updateData = async () => {
    setIsLoading(true);
    //setTimeout(() => { //testen der Ladezeit
    try {
      onSnapshot(collectionRef, (querySnapshot) => {
        const displayItem = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(displayItem);
      });
    } catch (error) { }
    finally {
      setIsLoading(false);
    };
    //}, 500);
  };
  /**
   * Function to add a book to Firestore collection.
   * @param {Object} newBook The new book object to add.
   * @returns {Object} Object indicating success or failure of the Add operation.
   */
  // Funktion zum Hinzufügen eines Buches
  const addBook = async (newBook) => {
    try {
      // Überprüfen, ob die ISBN bereits existiert
      const existingBook = data.find(book => book.isbn === newBook.isbn);
      if (existingBook) {
        throw new Error("There already exists a book with this ISBN!");
      }

      await addDoc(collectionRef, newBook);
      updateData(); // Nach dem Hinzufügen direkt aktualisieren
      return { success: true, message: "Book added successfully!" }; // Erfolg zurückgeben
    } catch (error) {
      console.error("Error adding book:", error.message);
      return { success: false, message: error.message }; // Fehler zurückgeben
    }
  };

  /**
   * Function to delete a book from Firestore collection.
   * @param {string} bookId The ID of the book to delete.
   */
  // Funktion zum Löschen eines Buches
  const deleteBook = async (bookId) => {
    const bookRef = doc(database, `${collectionName}/${bookId}`);

    try {
      await deleteDoc(bookRef);
      updateData(); // Nach dem Löschen direkt aktualisieren
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  /**
   * Function to update the rating of books in Firestore collection.
   * @param {string} bookId The ID of the book to update.
   * @param {number} rating The new rating to update.
   */
  const updateRating = async (bookId, rating) => {
    const database = getFirestore(firebaseApp);
    const bookRef = doc(database, collectionName, bookId);

    try {
      await updateDoc(bookRef, { rating });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Bewertung:", error);
    }
  };

  return { data, addBook, deleteBook, updateData, isLoading, updateRating };
}

export default Database;
