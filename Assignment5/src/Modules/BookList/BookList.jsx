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
 }

  const loadBooks = () => {
    if (filteredBooks.length === 0 ) {
      console.log("BooksList: Lade Bücher...");
      setFilteredBooks(books);
     // Ladezeit simulieren
    }
  };
  loadBooks();
}, [ books]);


  return (
    <div className="container mt-4">
    <SearchAndSort
      books={books}
      onFilteredBooksChange={setFilteredBooks} // Gefilterte Bücher updaten
    />

{isLoading ? (
      <div className="container mt-4 text-center" style={{ marginTop: '2000px' }}>
      <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="sr-only">Loading ...</span>
      </div>
      <p>Loading...</p>
    </div>
    ) : (
      <BookTable books={filteredBooks} onDelete={setFilteredBooks} onUpdate={setUpdate} onRatingChange={handleRatingChange}/>
    )}
  </div>
);
};

export default BooksList;
