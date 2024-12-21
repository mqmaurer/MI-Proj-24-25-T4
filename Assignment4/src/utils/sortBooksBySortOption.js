const SORT_OPTIONS = {
  NO_SORTING: "no-sorting",
  TITLE_ASCENDING: "title-ascending",
  TITLE_DESCENDING: "title-descending",
  AUTHOR_ASCENDING: "author-ascending",
  AUTHOR_DESCENDING: "author-descending",
  RATING_ASCENDING: "rating-ascending",
  RATING_DESCENDING:"rating-descending"
};

const sortBooksAscending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return -1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return 1;
    }

    return 0;
  });

  return books;
};

const sortBooksDescending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return 1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return -1;
    }

    return 0;
  });

  return books;
};

const sortBooksBySortOption = (books, sortOption) => {
  books.forEach((book) => {
    const savedRating = localStorage.getItem(book.isbn);
    book.rating = savedRating ? parseInt(savedRating) : 1; // 更新 book.rating
  });

  if (sortOption === SORT_OPTIONS.NO_SORTING) {
    return books;
  }

  if (sortOption === SORT_OPTIONS.TITLE_ASCENDING) {
    return sortBooksAscending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.TITLE_DESCENDING) {
    return sortBooksDescending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_ASCENDING) {
    return sortBooksAscending(books, "author");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_DESCENDING) {
    return sortBooksDescending(books, "author");
  }

  if (sortOption === SORT_OPTIONS.RATING_ASCENDING) {
    return sortBooksAscending(books, "rating");
  }

  if (sortOption === SORT_OPTIONS.RATING_DESCENDING) {
    return sortBooksDescending(books, "rating");
  }

  return books;
};

export { SORT_OPTIONS, sortBooksBySortOption };
