import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import TextInput from "./Input";
import validateInput from "./Validation";
import Database from "../../firebase_local/Database.jsx";
/**
 * AddBook component allows users to add a new book by filling out the form.
 * The form includes fields for author, title, ISBN, and description, all mandatory.
 * After submitting the form, the book is added to the database, and a toast notification is displayed.
 * If each blank in the form is filled, the ISBN format is correct and there's no book in the database with the same ISBN, a success notification is displayed.
 * If there's input missing, the ISBN has the wrong format or the book with the same ISBN has been found in the database, then an error notification is displayed.
 * @returns {JSX.Element} Rendered AddBook component with a form and toast notifications
 */
const AddBook = () => {
  const database = Database();

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    isbn: "",
    description: "",
  });
  /**
   * Handles input field changes and updates the form data state.
   * @param {React.ChangeEvent} e - The event object for the input change
   */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  /**
   * Handles form submission to add a new book to the database.
   * If the form data is valid, the book is added to the database and a success toast notification is displayed.
   * If the form data isn't valid an error toast notification is displayed
   * @param {React.FormEvent} e - The event object for form submission
   */
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!validateInput(formData)) {
      return;
    }

    const result = await database.addBook(formData);

    if (!result.success) {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
        className: "bg-warning text-white",
        icon: false,
      });
      return;
    }

    toast.success(result.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: true,
      className: "bg-primary text-white",
      icon: false,
    });

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
    </div>
  );
};

export default AddBook;
