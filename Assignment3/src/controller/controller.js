import { BookManager } from "../model/BookManager.js";
import { ThemeSwitcher } from "../userInterface/ThemeSwitcher.js";
import { BooksList } from "../view/BooksList.js";
import { AddBook } from "../view/AddBook.js";
import { BookDetail } from "../view/BookDetail.js";
import { Router } from "./Router.js";

export , function Controller() {
  const bookManager = BookManager();

  // start ThemeSwitcher
  ThemeSwitcher();

  const booksListView = BooksList();
  const addBookView = AddBook();
  const bookDetailView = BookDetail();

  const router = Router();
  registerRoutes();
  router.determineCurrentRouteAndExecuteCallback(); // triggers initial view rendering

  function registerRoutes() {
    router.addRoute("#/books", executeBookListRoute);
    router.addRoute("#/addBooks", executeAddBookRoute);
    router.addRoute("#/details", executeBookDetailRoute);
  }

  function executeBookDetailRoute() {
    const isbn = getBookIsbnFromHash();
    const book = bookManager.getBook(isbn);
    bookDetailView.renderView(book);
  }

  function executeBookListRoute() {
    const books = bookManager.getBooks();
    booksListView.renderView(books);
    booksListView.bindDetailButtonClick(function (event) {
      location.hash = "#/details/" + event.target.dataset.isbn;
    });
    booksListView.bindRemoveButtonClick(function (event) {
      removeBook(event.target.dataset.isbn);
    });
  }

  function executeAddBookRoute() {
    addBookView.renderView();
    addBookView.bindAddBookButtonClick(function () {
      try {
        const input = addBookView.getFormInputs();

        // Add Book to Store
        bookManager.addBook(
          input.title,
          input.author,
          input.isbn,
          input.description
        );

        addBookView.addBook();

        // Go to books view
        location.hash = "#/books";
      } catch (error) {
        addBookView.addBook(error);
      }
    });
  }

  function getBookIsbnFromHash() {
    const hash = location.hash;

    const hashParts = hash.split("/");
    const isbn = hashParts[hashParts.length - 1];

    return isbn;
  }

  function removeBook(isbn) {
    // Remove Book from store
    bookManager.removeBook(isbn);

    booksListView.removeBook(isbn);
  }
}
