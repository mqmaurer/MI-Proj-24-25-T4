import { useState, useEffect} from "react";
import SearchAndSort from "../BookList/SearchAndSort";
import BookTable from "../BookList/BookTable";
import Database from "../../firebase_local/Database.jsx"; 
/**
 * BooksList component that displays a list of books with sorting, filtering, and rating features.
 * It fetches added books from the Database, handles rating changes, and manages the filtered book list.
 * @returns {JSX.Element} The rendered BooksList component.
 */


const BooksList = () => { 
  const books = Database().data;
  const { updateData, isLoading, updateRating } = Database();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [update, setUpdate] = useState(false);

  /**
   * Handles rating changes for books rated by user.
   * Updates the rating both in the database and locally in the filtered books list.
   *
   * @param {string} bookId - The ID of the book whose rating is being changed.
   * @param {number} newRating - The number of stars given to the book.
   */
  const handleRatingChange = (bookId, newRating) => {
    updateRating(bookId, newRating);
    setFilteredBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, rating: newRating } : book
      )
    );
  };
  
useEffect(() => {
  // Setze den Ladevorgang, wenn filteredBooks leer ist
  
 if(update){
   updateData();
   setUpdate(false);
 }

  const loadBooks = () => {
    if (filteredBooks.length === 0 ) {
         setFilteredBooks(books);
     // Ladezeit simulieren
    }
  };
  loadBooks();
}, [filteredBooks, books]);


  return (
    <div className="container mt-4">
    <SearchAndSort
      books={books}
      onFilteredBooksChange={setFilteredBooks} // Gefilterte Bücher updaten
    />

   
      <BookTable books={filteredBooks} onDelete={setFilteredBooks} onUpdate={setUpdate} onRatingChange={handleRatingChange}/>
    
  </div>
);
};

export default BooksList;
