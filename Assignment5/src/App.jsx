import './assets/css/App.css'
import Header from './Modules/Header'
import LocationTabs from './Modules/LocationTabs'
import ViewSpace from './Modules/ViewSpace'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './Modules/NotFound';
function App() {

  return (
    <Router>
      <Header />
      <LocationTabs />
      <ViewSpace />
        <Routes>
            <Route path="/" element={<ViewSpace />} />
            {/*<Route path="/books" element={<Book List />} />*/}
            {/*<Route path="/addBooks" element={<Add Book />} />*/}
            {/*<Route path="/details" element={<Book Detail />} />*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
