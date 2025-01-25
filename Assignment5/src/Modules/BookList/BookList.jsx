import  { useState } from "react";
import SearchAndSort from "../BookList/SearchAndSort";
import BookTable from "../BookList/BookTable";
//import Rating from "./Rating";

const BooksList = ({
  books,
  // onDetailClick,
  // onRemoveClick,
  //onRatingClick,
  onInputSubmit,
  onInputReset,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [sortOption, setSortOption] = useState("NO_SORTING");

  const handleInputSubmit = () => {
    onInputSubmit({ searchText, searchOption, sortOption });
    
  };

  const handleInputReset = () => {
    setSearchText("");
    setSearchOption("title");
    setSortOption("NO_SORTING");
    onInputReset();
  };

  if (!books) {
    return (
      <div className="container mt-4">
      {/* Eingabebereich für Suche und Sortierung */}
      <SearchAndSort
        searchText={searchText}
        searchOption={searchOption}
        sortOption={sortOption}
        setSearchText={setSearchText}
        setSearchOption={setSearchOption}
        setSortOption={setSortOption}
        onSubmit={handleInputSubmit}
        onReset={handleInputReset}
      />

      {/* Tabelle der Bücher */}
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
          <tr> no books found </tr>
        </tbody>
      </table>
    </div>
    )
  }

  return (
    <div className="container mt-4">
      {/* Eingabebereich für Suche und Sortierung */}
      <SearchAndSort
        searchText={searchText}
        searchOption={searchOption}
        sortOption={sortOption}
        setSearchText={setSearchText}
        setSearchOption={setSearchOption}
        setSortOption={setSortOption}
        onSubmit={handleInputSubmit}
        onReset={handleInputReset}
      />


      <BookTable books={books} />
    </div>
  );
};

export default BooksList;
