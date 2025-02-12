import './assets/css/App.css'
import Header from './Modules/Header'
import LocationTabs from './Modules/LocationTabs'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookList from './Modules/BookList/BookList'
import AddBook from './Modules/AddBook/AddBook'
import BookDetail from './Modules/BookDetail'
import NotFound from './Modules/NotFound';

/**
 * App component that sets up the routing and renders the main sections of the app.
 * It includes the header, location tabs, and routes for different pages like book list, add book, book details, and a 404 page.
 * @returns {JSX.Element} The rendered App component.
 */


function App() {



  return (
    <Router>
      <Header />
      <LocationTabs />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/addBooks" element={<AddBook />} />
        <Route path="/details" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Routes>
    </Router>
  )
}

export default App
