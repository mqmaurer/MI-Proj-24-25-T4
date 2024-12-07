import Store from "./Store";
import Book from "./Book";

class BookManager {
  static getBooks() {
    return Store.getBooks();
  }

  static getBook(isbn) {
    return Store.getBook(isbn);
  }

  static addBook(title, author, isbn, description) {
    const book = new Book(title, author, isbn, description);
    const books = Store.getBooks();

    if (BookManager.doesISBNAlreadyExist(books, isbn)) {
      throw new Error("ISBN already exists");
    }

    Store.addBook(book);
  }

  static doesISBNAlreadyExist(books, isbn) {
    let doesISBNAlreadyExist = false;

    books.forEach((book) => {
      if (book.isbn === isbn) {
        doesISBNAlreadyExist = true;
      }
    });

    return doesISBNAlreadyExist;
  }

  static removeBook(isbn) {
    Store.removeBook(isbn);
  }

  static updateRating(isbn, rating) {
    Store.updateRating(isbn, rating);
  }
}


export default BookManager;
