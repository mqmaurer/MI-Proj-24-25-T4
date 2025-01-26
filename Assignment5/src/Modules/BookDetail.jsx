import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookDetail = () => {

  const location = useLocation();
  const { book } = location.state || {};

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