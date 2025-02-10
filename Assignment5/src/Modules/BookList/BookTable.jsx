import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Database from '../../firebase_local/Database';
/**
 * @typedef {Object} Book
 * @property {string} id - The ID for the book
 * @property {string} title - The Title of the book
 * @property {string} author - The Author of the book
 * @property {string} isbn - The ISBN of the book
 * @property {number} [rating] - Current rating (stars) of the book (1-5 stars)
 */

/**
 * BookTable component displays a table of books with interactive features like
 * delete, rating, and show book detail.
 *
 * @param {Object} props - Component props
 * @param {Book[]} props.books - Array of book objects to display
 * @param {Function} props.onDelete - Callback function to handle book deletion
 * @param {Function} props.onUpdate - Callback function to trigger parent component updates
 * @param {Function} props.onRatingChange - Callback function to handle book rating changes
 * @returns {JSX.Element} Rendered table of books with interactive features
 *
 */

const BookTable = ({ books, onDelete, onUpdate, onRatingChange }) => {
  const navigate = useNavigate();
  const { deleteBook, isLoading } = Database();
  const [deletedBooks, setDeletedBooks] = useState([]);

  /**
   * Navigates to the detail page of a specific book
   * @param {Book} book - The book object to show details for
   */
  const onDetailClick = (book) => {
    navigate('/details', { state: { book } });
  };

  /**
   * Handles the deletion of a book with animation
   * @param {string} bookId - ID of the book to be deleted
   */
  const onRemoveClick = (bookId) => {
    // Zeile nach rechts verschieben (Animation)
    setDeletedBooks((prev) => [...prev, bookId]);
    setTimeout(async () => {
      try {
        await deleteBook(bookId); onUpdate(true);
      } catch (error) {
      };

      onDelete((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    }, 500);

  };
  /**
   * Renders the rating of a book
   * @param {number} rating - Current rating value (1-5)
   * @param {string} bookId - ID of the book being rated
   * @returns {JSX.Element[]} Array of star elements
   */
  const renderRatingStars = (rating, bookId) => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <button
          key={i}
          className={`tableButton fa-solid fa-star ${i <= rating ? 'text-warning' : 'text-success'}`}
          onClick={() => onRatingChange(bookId, i)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onRatingChange(bookId, i);
            }
          }}
        ></button>
      );
    }
    return stars;
  };


  return (
    <div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {!isLoading && books.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="d-flex justify-content-center align-items-center">
                    No books found.

                  </div>
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <motion.tr
                  key={book.isbn}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{
                    opacity: deletedBooks.includes(book.id) ? 0 : 1,
                    x: deletedBooks.includes(book.id) ? 200 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <button className="fas fa-eye text-primary detail-button tableButton" onClick={() => onDetailClick(book)}></button>
                  </td>
                  <td>
                    <button className="fas fa-trash text-primary remove-button tableButton" onClick={() => onRemoveClick(book.id)}></button>
                  </td>
                  <td>
                    <div className="rating-stars">{renderRatingStars(book.rating || 1, book.id)}</div>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

BookTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default BookTable;