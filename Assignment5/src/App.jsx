import './assets/css/App.css'
import Header from './Modules/Header'
import LocationTabs from './Modules/LocationTabs'
import ViewSpace from './Modules/ViewSpace'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookList from './Modules/BookList/BookList'
import AddBook from './Modules/AddBook/AddBook'
import BookDetail from './Modules/BookDetail'
import NotFound from './Modules/NotFound';
import Database from './firebase_local/Database'; // Hook importieren




function App() {




  return (
    <Router>
      <Header />
      <LocationTabs />
      <ViewSpace />
        <Routes>
            <Route path="/" element={<ViewSpace />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/addBooks" element={<AddBook />} />
            <Route path="/details" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
