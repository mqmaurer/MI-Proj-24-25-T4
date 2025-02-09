import { Link } from 'react-router-dom'
import "../assets/css/NotFound.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
/**
 * NotFound component that displays a 404 error message and offers a link back to the book list.
 * @returns {JSX.Element} The rendered NotFound component.
 */

const NotFound = () => {
  return (
    <div className="not-found-container">
          <h1 className="not-found-title">404 - Not Found</h1>
          <Link to="/books" className="not-found-link">
            <FontAwesomeIcon icon={faLink} /> Back to book list
          </Link>
    </div>
  );
};


export default NotFound;
