import { Store } from "./Store.js";
import { Book } from "./Book.js";

export function BookManager() {
  const store = Store();

  function getBooks() {
    return store.getBooks();
  }

  function getBook(isbn) {
    return store.getBook(isbn);
  }

  function addBook(title, author, isbn, description) {
    const book = Book(title, author, isbn, description);

    const books = store.getBooks();

    if (doesISBNAlreadyExist(books, isbn)) {
      throw new Error("ISBN already exists");
    }

    store.addBook(book);
  }

  function doesISBNAlreadyExist(books, isbn) {
    for (let index = 0; index < books.length; index++) {
      const book = books[index];
      if (book.isbn === isbn) {
        return true;
      }
    }

    return false;
  }

  function removeBook(isbn) {
    store.removeBook(isbn);
  }

  return {
    getBooks: getBooks,
    getBook: getBook,
    addBook: addBook,
    doesISBNAlreadyExist: doesISBNAlreadyExist,
    removeBook: removeBook,
  };
}
