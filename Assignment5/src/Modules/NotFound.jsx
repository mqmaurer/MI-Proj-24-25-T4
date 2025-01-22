import { Link } from 'react-router-dom'
import "../assets/css/NotFound.css";

const NotFound = () => {
  return (
    <div className="container mt-4">
      <h2>404 - Not Found</h2>
      <Link to="/">Back to book list</Link>
    </div>
  );
};

export default NotFound;
