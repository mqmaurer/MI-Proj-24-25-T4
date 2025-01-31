import { useState } from "react";
import Database from "../firebase_local/Database.jsx";



// nur zum Testen
//Rating, ISBN-Prüfung und so fehlt  
// Funktionen sollten grundlegen aber stimmen
const AddBook = () => {
  const { addBook } = Database(); // Zugriff auf die addBook-Funktion
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
  });

  async function getBookByISBN(isbn) {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const data = await response.json();
    
    // Prüfen, ob das Buch existiert
    if (data[`ISBN:${isbn}`]) {
      const book = data[`ISBN:${isbn}`];
      return {
        title: book.title || "Unbekannter Titel",
        author: book.authors?.[0]?.name || "Unbekannter Autor",
        isbn: isbn,
        description: book.excerpts?.[0]?.text || "Keine Beschreibung verfügbar"
      };
    } else {
      console.log("Kein Buch gefunden!");
      return null;
    }
  }
  
  const einBuchbitte = (isbn) => { 
    getBookByISBN(isbn).then(book => {
      console.log(book);
      if (book === null) {
        alert("Kein Buch gefunden!");
        return;
      }
  
      // Buchdetails setzen
      setBookDetails({
        title: book.title, 
        author: book.author, 
        isbn: book.isbn, 
        description: book.description
      });
  
      // Buch in die Datenbank hinzufügen
      addBook({ title: book.title, 
        author: book.author, 
        isbn: book.isbn, 
        description: book.description});
  
      // Formular leeren
      setBookDetails({
        title: "",
        author: "",
        isbn: "",
        description: "",
      });
    });  
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookDetails.title && !bookDetails.author && bookDetails.isbn) {
      einBuchbitte(bookDetails.isbn);
      return;
    }
    if (!bookDetails.title || !bookDetails.author || !bookDetails.isbn) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    addBook(bookDetails); // Fügt das Buch der Firebase-Datenbank hinzu
    setBookDetails({
      title: "",
      author: "",
      isbn: "",
      description: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Buch hinzufügen</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={bookDetails.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-control"
            value={bookDetails.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            className="form-control"
            value={bookDetails.isbn}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschreibung</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={bookDetails.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Hinzufügen
        </button>
      </form>
    </div>
  );
};

export default AddBook;

