import { useState } from "react";
import Database from "../firebase_local/Database.jsx";

const AddBook = () => {
  const { addBook } = Database(); // Zugriff auf die addBook-Funktion
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
