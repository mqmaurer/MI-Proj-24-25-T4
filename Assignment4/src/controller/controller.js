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
    let currentSearchInput = { searchText: "", searchOption: "title" };
    let currentSortOption = "noSorting";

    const books = BookManager.getBooks();
    BooksList.renderView(books);

    BooksList.bindInputPanelSubmit(() => {
      currentSearchInput = BooksList.getSearchInput();
      currentSortOption = BooksList.getSortOption();

      const filteredBooks = filterBooksBySearch(
        BookManager.getBooks(),
        currentSearchInput
      );

      const sortedFilteredBooks = sortBooksBySortOption(
        filteredBooks,
        currentSortOption
      );

      BooksList.renderBookTable(sortedFilteredBooks);
    });

    BooksList.bindInputPanelReset(() => {
      BooksList.renderBookTable(books);
      BooksList.resetInputPanel();

      currentSearchInput = { searchText: "", searchOption: "title" };
      currentSortOption = "noSorting";
    });

    BooksList.setDetailButtonClickCallback((isbn) => {
      window.location.hash = `#/details/${isbn}`;
    });

    BooksList.setRemoveButtonClickCallback((isbn) => {
      Controller.removeBook(isbn);
    });

    BooksList.setRatingClickCallback((rating, isbn) => {
      Controller.updateRatingForBook(isbn, rating, currentSearchInput, currentSortOption);
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

  static updateRatingForBook(isbn, rating, currentSearchInput, currentSortOption) {
    BookManager.updateRating(isbn, rating);
    localStorage.setItem(isbn, rating);
    const books = BookManager.getBooks();
    const filteredBooks = filterBooksBySearch(books, currentSearchInput);
    const sortedFilteredBooks = sortBooksBySortOption(
      filteredBooks,
      currentSortOption
    );

    BooksList.renderBookTable(sortedFilteredBooks);
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
}

export default Controller;
