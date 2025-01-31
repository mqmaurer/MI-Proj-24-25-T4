import { useState, useEffect} from "react";
import SearchAndSort from "../BookList/SearchAndSort";
import BookTable from "../BookList/BookTable";
import Database from "../../firebase_local/Database.jsx"; 


const BooksList = () => { 
  const books = Database().data;
  const { updateData, isLoading, updateRating } = Database();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [update, setUpdate] = useState(false);
 
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
   setFilteredBooks(books);
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

    {isLoading ? (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="ml-2">Loading...</p>
      </div>
    ) : (
      <BookTable books={filteredBooks} onDelete={setFilteredBooks} onUpdate={setUpdate} onRatingChange={handleRatingChange}/>
    )}
  </div>
);
};

export default BooksList;
