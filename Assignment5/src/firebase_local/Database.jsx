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

    try {
      onSnapshot(collectionRef, (querySnapshot) => {
        const displayItem = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(displayItem);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
     }
    finally {
      setIsLoading(false);
    };
  };

  /**
   * Function to add a book to Firestore collection.
   * @param {Object} newBook The new book object to add.
   * @returns {Object} Object indicating success or failure of the Add operation.
   */
  const addBook = async (newBook) => {
    try {
      // Check if book with same ISBN already exists
      const existingBook = data.find(book => book.isbn === newBook.isbn);
      if (existingBook) {
        throw new Error("There already exists a book with this ISBN!");
      }

      await addDoc(collectionRef, newBook);
      updateData();
      return { success: true, message: "Book added successfully!" };
    } catch (error) {
      console.error("Error adding book:", error.message);
      return { success: false, message: error.message };
    }
  };

  /**
   * Function to delete a book from Firestore collection.
   * @param {string} bookId The ID of the book to delete.
   */
  const deleteBook = async (bookId) => {
    const bookRef = doc(database, `${collectionName}/${bookId}`);

    try {
      await deleteDoc(bookRef);
      updateData();
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
      console.error("Error while updating rating", error);
    }
  };

  return { data, addBook, deleteBook, updateData, isLoading, updateRating };
}

export default Database;
