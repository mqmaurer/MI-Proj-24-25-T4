import { useState, useEffect} from "react";
import SearchAndSort from "../BookList/SearchAndSort";
import BookTable from "../BookList/BookTable";
import Database from "../../firebase_local/Database.jsx"; 


const BooksList = ({ books }) => {

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [deletedBooks, setDeletedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { deleteBook } = Database();

  const onRemoveClick = (bookId) => {
 // Zeile nach rechts verschieben (Animation)
 setDeletedBooks((prev) => [...prev, bookId]);

 
 setTimeout(() => {
   deleteBook(bookId); 
   setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
 }, 500); 

};

useEffect(() => {
  // Setze den Ladevorgang, wenn filteredBooks leer ist
  setIsLoading(filteredBooks.length === 0);

  // Hier könnte eine Abfrage oder Datenaktualisierung implementiert werden
  const loadBooks = () => {
    if (filteredBooks.length === 0) {
      // Simuliere das Laden von Daten (Datenbankabfrage kann hier eingebaut werden)
      setTimeout(() => {
        setFilteredBooks(books); // Beispiel: Bücher nach Ladezeit hinzufügen
      }, 1000); // Ladezeit simulieren
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

    {/* Spinner anzeigen, solange filteredBooks leer ist */}
    {isLoading ? (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="ml-2">Loading...</p>
      </div>
    ) : (
      <BookTable books={filteredBooks} onRemoveClick={onRemoveClick} deletedBooks={deletedBooks} />
    )}
  </div>
);
};

export default BooksList;
