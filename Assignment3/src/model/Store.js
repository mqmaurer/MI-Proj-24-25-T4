export function Store() {
  function getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      const booksFromStorage = localStorage.getItem("books");
      books = JSON.parse(booksFromStorage);
    }

    return books;
  }

  function getBook(isbn) {
    const books = getBooks();

    for (let index = 0; index < books.length; index++) {
      const book = books[index];
      if (book.isbn === isbn) {
        return book;
      }
    }
  }

  function addBook(book) {
    const books = getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  function removeBook(isbn) {
    const books = getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  return {
    removeBook: removeBook,
    addBook: addBook,
    getBook: getBook,
    getBooks: getBooks,
  };
}
