
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BookTable = ({ books, onRemoveClick, deletedBooks, onRatingChange }) => {
  const navigate = useNavigate();
  
  const onDetailClick = (book) => {
    //console.log(book);
    navigate('/details', { state: { book } });
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
        {books.map((book) => (
            <motion.tr
                key={book.isbn}
                initial={{opacity: 1, x: 0}} // Anfangszustand: Sichtbar, an ursprünglicher Position
                animate={{
                    opacity: deletedBooks.includes(book.id) ? 0 : 1, // Wenn gelöscht, unsichtbar
                    x: deletedBooks.includes(book.id) ? 200 : 0, // Wenn gelöscht, nach rechts verschieben
                }}
                transition={{type: "spring", stiffness: 50}}
            >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                    <a
                        className="fas fa-eye text-primary detail-button"
                        onClick={() => onDetailClick(book)}
                    ></a>
                </td>
                <td>
                    <a
                        className="fas fa-trash text-primary remove-button"
                        onClick={() => {
                            onRemoveClick(book.id)
                        }} // Löschen des Buchs
                    ></a>
                </td>
                <td>
                    <div className="rating-stars">
                        {renderRatingStars(book.rating || 1, book.id)}
                    </div>
                </td>
            </motion.tr>
        ))}
      </AnimatePresence>
      </tbody>
    </table>
  );
};

export default BookTable;
