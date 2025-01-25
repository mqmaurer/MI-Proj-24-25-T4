
//import React from "react";

const SearchAndSort = ({
  searchText,
  searchOption,
  sortOption,
  setSearchText,
  setSearchOption,
  setSortOption,
  onSubmit,
  onReset,
}) => {

  
  return (
    <div>
  <div className="form-row">
    <div className="form-group col-sm-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search Text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
    <div className="form-group col-sm-3">
      <select
        className="form-control"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </select>
    </div>
    <div className="form-group col-sm-3">
      <select
        className="form-control"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="NO_SORTING">No Sorting</option>
        <option value="TITLE_ASCENDING">Title Ascending</option>
        <option value="TITLE_DESCENDING">Title Descending</option>
        <option value="AUTHOR_ASCENDING">Author Ascending</option>
        <option value="AUTHOR_DESCENDING">Author Descending</option>
        <option value="RATING_ASCENDING">Rating Ascending</option>
        <option value="RATING_DESCENDING">Rating Descending</option>
      </select>
    </div>
    <div className="form-group col-6 col-sm-1">
      <button className="btn btn-primary btn-block" onClick={onSubmit}>
        <i className="fa fa-check"></i>
      </button>
    </div>
    <div className="form-group col-6 col-sm-1">
      <button className="btn btn-secondary btn-block" onClick={onReset}>
        X
      </button>
    </div>
  </div>
  </div>
  );
};



export default SearchAndSort;