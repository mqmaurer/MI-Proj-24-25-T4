import './assets/css/App.css'
import Header from './Modules/Header'
import LocationTabs from './Modules/LocationTabs'
import ViewSpace from './Modules/ViewSpace'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookList from './Modules/BookList/BookList'
import AddBook from './Modules/AddBook'
import BookDetail from './Modules/BookDetail'
import NotFound from './Modules/NotFound';

function App() {
  const books = [
    {
      author: "Max",
      title: "Hello World",
      isbn: "123-4567-89-2",
      description:
        "First Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      author: "Mike",
      title: "Crazy Game",
      isbn: "123-4567-89-X",
      description:
        "Third Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      author: "Fritz",
      title: "Hello Dave",
      isbn: "123-4567-89-5",
      description:
        "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      author: "Adam",
      title: "Hello Adam",
      isbn: "123-4567-87-8",
      description:
        "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
    {
      author: "Zlatan",
      title: "Hello Zlatan",
      isbn: "123-4567-87-7",
      description:
        "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
    },
  ];

  return (
    <Router>
      <Header />
      <LocationTabs />
      <ViewSpace />
        <Routes>
            <Route path="/" element={<ViewSpace />} />
            <Route path="/books" element={<BookList books={books}/>} />
            <Route path="/addBooks" element={<AddBook />} />
            <Route path="/details" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
