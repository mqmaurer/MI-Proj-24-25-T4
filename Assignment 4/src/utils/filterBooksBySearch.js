const filterBooksBySearch = (books, searchInput) => {
  const filteredBooks = books.filter((book) => {
    const { searchOption, searchText } = searchInput;
    if (book[searchOption].includes(searchText)) {
      return true;
    }
    return false;
  });

  return filteredBooks;
};

export default filterBooksBySearch;
