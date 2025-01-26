import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import TextInput from "./Input";
import validateInput from "./Validation";

const AddBook = () => {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    isbn: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!validateInput(formData)) {
      return;
    }

    // Erfolgsnachricht
    toast.success("Book added successfully");

    // Formular zurücksetzen
    setFormData({
      author: "",
      title: "",
      isbn: "",
      description: "",
    });
  };

  return (
    <div className="container mt-4">
      <form id="book-form" onSubmit={handleAddBook}>
        <TextInput
          label="Author"
          id="author"
          value={formData.author}
          onChange={handleChange}
        />
        <TextInput
          label="Titel"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextInput
          label="ISBN"
          id="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block add-button">
          <i className="fas fa-plus"></i> Add Book
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <p></p>
        <div></div>
      </div>
    </div>
  );
};

export default AddBook;

//TODO
// style warnings anpassen
