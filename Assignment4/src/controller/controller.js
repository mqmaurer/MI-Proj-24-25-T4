import ThemeSwitcher from "../userInterface/ThemeSwitcher";
import BookManager from "../model/BookManager";
import BooksList from "../view/BooksList";
import BookDetail from "../view/BookDetail";
import AddBook from "../view/AddBook";
import Router from "./Router";
import filterBooksBySearch from "../utils/filterBooksBySearch";
import { sortBooksBySortOption } from "../utils/sortBooksBySortOption";

class Controller {
  constructor() {
    this.router = new Router();
    this.themeSwitcher = new ThemeSwitcher();
  }

  init() {
    this.registerRoutes();
    this.router.determineCurrentRouteAndExecuteCallback(); // triggers initial view rendering
    this.themeSwitcher.init();
  }

  registerRoutes() {
    this.router.addRoute("#/books", Controller.executeBookListRoute.bind(this));
    this.router.addRoute(
      "#/addBooks",
      Controller.executeAddBookRoute.bind(this)
    );
    this.router.addRoute(
      "#/details",
      Controller.executeBookDetailRoute.bind(this)
    );
  }

  static executeBookListRoute() {
    const books = BookManager.getBooks();

    BooksList.renderView(books);

    BooksList.bindInputPanelSubmit(() => {
      const searchInput = BooksList.getSearchInput();
      const sortOption = BooksList.getSortOption();

      const filteredBooks = filterBooksBySearch(
        BookManager.getBooks(),
        searchInput
      );

      const sortedFilteredBooks = sortBooksBySortOption(
        filteredBooks,
        sortOption
      );

      BooksList.renderBookTable(sortedFilteredBooks);
    });

    BooksList.bindInputPanelReset(() => {
      BooksList.renderBookTable(books);
      BooksList.resetInputPanel();
    });

    BooksList.setDetailButtonClickCallback((isbn) => {
      window.location.hash = `#/details/${isbn}`;
    });

    BooksList.setRemoveButtonClickCallback((isbn) => {
      Controller.removeBook(isbn);
    });
  }

  static executeAddBookRoute() {
    AddBook.renderView();
    AddBook.bindAddBookButtonClick(() => {
      try {
        const input = AddBook.getFormInputs();

        // Add Book to Store
        BookManager.addBook(
          input.title,
          input.author,
          input.isbn,
          input.description
        );

        AddBook.addBook();

        // Go to books view
        window.location.hash = "#/books";
      } catch (error) {
        AddBook.addBook(error);
      }
    });
  }

  static executeBookDetailRoute() {
    const isbn = Controller.getBookIsbnFromHash();
    const book = BookManager.getBook(isbn);
    BookDetail.renderView(book);
  }

  static getBookIsbnFromHash() {
    const { hash } = window.location;

    const hashParts = hash.split("/");
    const isbn = hashParts[hashParts.length - 1];

    return isbn;
  }

  static removeBook(isbn) {
    BookManager.removeBook(isbn);
    BooksList.removeBook(isbn);
  }

  static updateRating(isbn, rating) {
    BookManager.updateRating(isbn, rating);
    const books = BookManager.getBooks();
    BooksList.renderBookTable(books);
  }
}

export default Controller;
