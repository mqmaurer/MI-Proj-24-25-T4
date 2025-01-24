import "./assets/css/App.css";
import AddBook from "./Modules/AddBook";
import Header from "./Modules/Header";
import LocationTabs from "./Modules/LocationTabs";
import ViewSpace from "./Modules/ViewSpace";

function App() {
  return (
    <>
      <Header />
      <LocationTabs />
      <ViewSpace />
      <AddBook />
    </>
  );
}

export default App;
