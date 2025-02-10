import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Database from '../firebase_local/Database';

/**
 * @typedef {Object} Book
 * @property {string} author - The author of the book
 * @property {string} title - The title of the book
 * @property {string} isbn - The ISBN of the book
 * @property {string} description - A description of the book
 */

/**
 * @component
 * @returns {JSX.Element} A React component displaying book details.
 */
const BookDetail = () => {
  /**
 * Fetches the selected book from the page's location state.
 * @type {{ book: Book }}
 */
  const location = useLocation();
  const { book } = location.state || {};
  /**
   * Fetches loading state from the Database module.
   * @type {{ isLoading: boolean }}
   */
  const { isLoading } = Database();

  /** Displays a loading spinner during the process of data retrieval */
  if (isLoading) {
    return (
      <div className="container mt-4 text-center" style={{ marginTop: '2000px' }}>
        <output className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="sr-only">Loading ...</span>
        </output>
        <p>Loading...</p>
      </div >
    );
  }

  if (!book) {
    return (
      <div className="container mt-4">
        <motion.div
          className="alert alert-warning"
          initial={{ opacity: 0 }} // Startzustand: Unsichtbar
          animate={{ opacity: 1 }} // Endzustand: Voll sichtbar
          transition={{ duration: 1.5 }} // Dauer der Animation
        >
          No Book selected!!!
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: '25rem' }}>
        <FontAwesomeIcon
          icon={faBookReader}
          className="text-primary mt-4 mx-auto"
          style={{ fontSize: '70px' }}
        />
        <div className="card-body">
          <div className="text-center">Author: {book.author}</div>
          <div className="text-center">Title: {book.title}</div>
          <div className="text-center">ISBN: {book.isbn}</div>

          <hr />
          <div>
            {book.description}
          </div>
        </div>
      </div>
    </div>
  )
}
export default BookDetail