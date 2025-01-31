import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseApp from "./FB_App";

function Database() {
  const [data, setData] = useState([]);
  const database = getFirestore(firebaseApp);
  console.log(database);

  useEffect(() => {
    // Reference to the specific collection in the database
    const collectionRef = collection(database, "testbooks");
    console.log(collectionRef);

    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
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

  // Function to add a book to the database
  const addBook = async (newBook) => {
    const collectionRef = collection(database, "testbooks");

    // TODO: Change Error Handling when adding a book
    try {
      await addDoc(collectionRef, newBook);
      console.log("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Function to delete a book from the database
  const deleteBook = async (bookId) => {
    // Path of book to be deleted
    const bookRef = doc(database, `testbooks/${bookId}`);

    try {
      await deleteDoc(bookRef);
      console.log("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return { data, addBook, deleteBook };
}

export default Database;