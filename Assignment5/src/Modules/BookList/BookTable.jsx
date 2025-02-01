
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Database from '../../firebase_local/Database';

const BookTable = ({ books,  onDelete, onUpdate, onRatingChange }) => {
  const navigate = useNavigate();
  const { deleteBook, isLoading} = Database();
   const [deletedBooks, setDeletedBooks] = useState([]);

  
  const onDetailClick = (book) => {
    navigate('/details', { state: { book } });
  };

  const onRemoveClick = (bookId) => {
    // Zeile nach rechts verschieben (Animation)
    setDeletedBooks((prev) => [...prev, bookId]);
   console.log("Book in Databank!" + books);
    setTimeout(async() => {
      try {
      await deleteBook(bookId); onUpdate(true);} catch (error) {
      };
     
      console.log("Book deleted!" + books);
      onDelete((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    }, 500); 
   
   };

   const renderRatingStars = (rating, bookId) => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star ${i <= rating ? 'text-warning' : 'text-success'}`}
          onClick={() => onRatingChange(bookId, i)}
        ></i>
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
            { !isLoading && books.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="d-flex justify-content-center align-items-center">
                    No books found. Please add a book.
                   
                     
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
                    <a className="fas fa-eye text-primary detail-button" onClick={() => onDetailClick(book)}></a>
                  </td>
                  <td>
                    <a className="fas fa-trash text-primary remove-button" onClick={() => onRemoveClick(book.id)}></a>
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

export default BookTable;
