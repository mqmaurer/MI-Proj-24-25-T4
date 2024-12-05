import { BookManager } from "../model/BookManager.js";
import { ThemeSwitcher } from "../userInterface/ThemeSwitcher.js";
import { BooksList } from "../view/BooksList.js";
import { AddBook } from "../view/AddBook.js";
import { BookDetail } from "../view/BookDetail.js";
import { Router } from "./Router.js";

export function Controller() {
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

    // Initialization of Button mechanics
    initializeButtons();
  }

  function initializeButtons() {

    // Functionality of form's submit button
    booksListView.bindSearchButtonClick((textInput, searchOption, sortOption) => {
      const filteredBooks = filterBooks(textInput, searchOption);
      const sortedBooks = sortBooks(filteredBooks, sortOption);
      // Remove Table
      booksListView.removeTable();
      // Pass filtered and sorted books to the view
      booksListView.addBooksToTable(sortedBooks);
      initializeButtons();
    });

    // Functionality of form's reset button
    booksListView.bindResetButtonClick(() => {
      // Update books for new view
      const book = bookManager.getBooks();
      booksListView.renderView(book);
      initializeButtons();
    });

    // Functionality of table's detail button
    booksListView.bindDetailButtonClick(function (event) {
      location.hash = "#/details/" + event.target.dataset.isbn;
    });;

    // Functionality of table's remove button
    booksListView.bindRemoveButtonClick(function (event) {
      removeBook(event.target.dataset.isbn);
    })
  }

  function filterBooks(textInput, searchOption) {
    let books = bookManager.getBooks();

    if (searchOption === 'title') {
      books = books.filter(book => book.title.toLowerCase().includes(textInput.toLowerCase()));
    } else if (searchOption === 'author') {
      books = books.filter(book => book.author.toLowerCase().includes(textInput.toLowerCase()));
    } else if (searchOption === 'isbn') {
      books = books.filter(book => book.isbn.toLowerCase().includes(textInput.toLowerCase()));
    }

    return books;
  }

  function sortBooks(books, sortOption) {
    let sortedBooks;

    if (sortOption === 'titleAsc') {
      sortedBooks = books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'titleDesc') {
      sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'authorAsc') {
      sortedBooks = books.sort((a, b) => b.author.localeCompare(a.author));
    } else if (sortOption === 'authorDesc') {
      sortedBooks = books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortOption === 'noSort') {
      sortedBooks = books;
    }

    return sortedBooks;
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
