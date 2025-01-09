import { describe, it, vi, expect, beforeEach } from "vitest";
import Controller from "../src/controller/controller";
import Router from "../src/controller/Router";
import ThemeSwitcher from "../src/userInterface/ThemeSwitcher";
import BookManager from "../src/model/BookManager";
import BooksList from "../src/view/BooksList";
import AddBook from "../src/view/AddBook";
import BookDetail from "../src/view/BookDetail";
import   filterBooksBySearch from "../src/utils/filterBooksBySearch";
import   { SORT_OPTIONS, sortBooksBySortOption } from "../src/utils/sortBooksBySortOption";
import * as sortUtils from "../src/utils/sortBooksBySortOption"; 

// Mocking dependencies
vi.mock("../src/controller/Router");
vi.mock("../src/userInterface/ThemeSwitcher");
vi.mock("../src/model/BookManager");
vi.mock("../src/view/BooksList");
vi.mock("../src/view/AddBook");
vi.mock("../src/view/BookDetail");
vi.mock("../src/utils/filterBooksBySearch");
vi.mock("../utils/sortBooksBySortOption"); 

describe("Controller", () => {
   let controller;
   beforeEach(() => { 
      vi.restoreAllMocks();
      controller = new Controller();
      controller.init();

      global.window = {
        location: {
          hash: '',
        },
      };

      global.localStorage = {
         getItem: vi.fn(),
         setItem: vi.fn(),
         removeItem: vi.fn(),
         clear: vi.fn(),
       };
    });
   
  
describe("init", () => {
   it("should initialize and call Router and ThemeSwitcher", () => {
      controller.init();
      expect(controller.router.determineCurrentRouteAndExecuteCallback).toHaveBeenCalled();
      expect(controller.themeSwitcher.init).toHaveBeenCalled();
   });
  });

describe("registerRoutes", () => {
   it("should register routes correctly", () => {
      controller.registerRoutes();
      expect(controller.router.addRoute).toHaveBeenCalledWith(
         "#/books",
         expect.any(Function)
      );
      expect(controller.router.addRoute).toHaveBeenCalledWith(
         "#/addBooks",
         expect.any(Function)
      );
      expect(controller.router.addRoute).toHaveBeenCalledWith(
         "#/details",
         expect.any(Function)
      );
   });
  });

  describe ("executeBookListRoute", () => {
   
   it("should execute book list route and render books", () => {
      BookManager.getBooks.mockReturnValue([{ title: "Book 1", author: "Author 1" }]);
      Controller.executeBookListRoute();
      expect(BooksList.renderView).toHaveBeenCalledWith([
         { title: "Book 1", author: "Author 1" },
      ]);
   });
 

   it("should return correct values for searchInput and sortOption", () => {
    
    const mockSearchInput = { searchOption: "author", searchText: "Author 1" };
    const mockSortOption = "title";
 
    vi.spyOn(BooksList, 'getSearchInput').mockReturnValue(mockSearchInput);
    vi.spyOn(BooksList, 'getSortOption').mockReturnValue(mockSortOption);
 
    Controller.executeBookListRoute();
 
    expect(BooksList.getSearchInput()).toEqual(mockSearchInput);
    expect(BooksList.getSortOption()).toBe(mockSortOption);
 });

 it("should call bindInputPanelSubmit ", () => {
  const mockRenderView = vi.fn();
  const mockGetBooks = vi.fn().mockReturnValue([{ title: "Book A", author: "Author A" }]);
  const mockGetSearchInput = vi.fn().mockReturnValue({ searchOption: "title", searchText: "Book A" });
  const mockGetSortOption = vi.fn().mockReturnValue(SORT_OPTIONS.TITLE_DESCENDING);


  vi.spyOn(BooksList, 'renderView').mockImplementation(mockRenderView);
  vi.spyOn(BooksList, 'getSearchInput').mockImplementation(mockGetSearchInput);
  vi.spyOn(BooksList, 'getSortOption').mockImplementation(mockGetSortOption);
  vi.spyOn(BookManager, 'getBooks').mockImplementation(mockGetBooks);


  const mockBindSubmit = vi.fn();
  vi.spyOn(BooksList, 'bindInputPanelSubmit').mockImplementation(mockBindSubmit);


  Controller.executeBookListRoute();
  expect(mockBindSubmit).toHaveBeenCalled();
});



it('should call binInputPanelReset', () => {
   const resetCallback = vi.fn();
   
  
   BooksList.bindInputPanelReset.mockImplementation((callback) => {
       callback(); 
   });

   const resetInputPanelSpy = vi.fn();
   BooksList.resetInputPanel = resetInputPanelSpy;

   BooksList.bindInputPanelReset(resetCallback);

   expect(resetCallback).toHaveBeenCalled();
   
});

it("should bind the input panel reset callback", () => {
   const mockRenderBookTable = vi.fn();
   const mockResetInputPanel = vi.fn();
   
 
   vi.spyOn(BookManager, 'getBooks').mockReturnValue([{ isbn: '12345', title: 'Test Book' }]);
   vi.spyOn(BooksList, 'renderBookTable').mockImplementation(mockRenderBookTable);
   vi.spyOn(BooksList, 'resetInputPanel').mockImplementation(mockResetInputPanel);
 
   BooksList.bindInputPanelReset(() => {
      const allBooks = BookManager.getBooks();
      BooksList.renderBookTable(allBooks);
      BooksList.resetInputPanel();
   });
 
   BooksList.renderBookTable();
   BooksList.resetInputPanel();
 
   expect(mockRenderBookTable).toHaveBeenCalled();
   expect(mockResetInputPanel).toHaveBeenCalled();
 });
 


it('should correctly filter books based on search input', () => {

   const mockBooks = [
     { title: "Book A", author: "Author A", isbn: "123" },
     { title: "Book B", author: "Author B", isbn: "456" },
     { title: "Another Book", author: "Author C", isbn: "789" },
   ];

   vi.spyOn(BookManager, 'getBooks').mockReturnValue(mockBooks);
 
   const currentSearchInput = {searchOption: "title", searchTest: "Book A"};
 
  
   const filteredBooks = filterBooksBySearch(BookManager.getBooks(), currentSearchInput);
 
 
   expect(BookManager.getBooks).toHaveBeenCalled(); 
   expect(filterBooksBySearch).toHaveBeenCalledWith(mockBooks, currentSearchInput); 
 });


 it("should set the remove button click callback", () => {
  const mockRemoveBook = vi.fn();  
  vi.spyOn(Controller, 'removeBook').mockImplementation(mockRemoveBook);   

  BooksList.setRemoveButtonClickCallback((isbn) => {
     Controller.removeBook(isbn);   
  });

  const removeButtonCallback = BooksList.setRemoveButtonClickCallback.mock.calls[0][0];  
  removeButtonCallback('12345');   

  
  expect(mockRemoveBook).toHaveBeenCalledWith('12345');
});




it("should set the detail button click callback", () => {
  
  const originalHash = window.location.hash;
  
  Object.defineProperty(window, 'location', {
     value: {
        hash: "",
        set hash(value) {
           this._hash = value;   
        },
        get hash() {
           return this._hash || "";   
        },
     },
     writable: true,
  });

 
  const setDetailButtonClickCallbackMock = vi.fn((isbn) => {
     window.location.hash = `#/details/${isbn}`;   
  });

 
  BooksList.setDetailButtonClickCallback(setDetailButtonClickCallbackMock);
  expect(BooksList.setDetailButtonClickCallback).toHaveBeenCalled();


  setDetailButtonClickCallbackMock('12345');

  expect(window.location.hash).toBe('#/details/12345');
  
  
  window.location.hash = originalHash;


});

it('should correctly set search and sort options on submit', () => {
   
   const mockBooks = [
     { title: "Book A", author: "Author A", isbn: "123" },
     { title: "Book B", author: "Author B", isbn: "456" },
   ];
 
   
   vi.spyOn(BookManager, 'getBooks').mockReturnValue(mockBooks);
   vi.spyOn(BooksList, 'getSearchInput').mockReturnValue("Book A");
   vi.spyOn(BooksList, 'getSortOption').mockReturnValue("title-ascending");
 
   
   vi.spyOn(BooksList, 'renderBookTable').mockImplementation(() => {});
 
   
   BooksList.bindInputPanelSubmit(() => {
    
     const currentSearchInput = BooksList.getSearchInput();
     const currentSortOption = BooksList.getSortOption();
 
     const filteredBooks = filterBooksBySearch(BookManager.getBooks(), currentSearchInput);
     const sortedFilteredBooks = sortBooksBySortOption(filteredBooks, currentSortOption);
 
     BooksList.renderBookTable(sortedFilteredBooks);
     expect(BooksList.renderBookTable).toHaveBeenCalledWith(sortedFilteredBooks);
   });
  expect(BooksList.bindInputPanelSubmit).toHaveBeenCalled();
 });


  });

  describe("executeAddBookRoute", () => {
   it("should execute add book   and handle form ", () => {
      AddBook.getFormInputs.mockReturnValue({
         title: "New Book",
         author: "Author",
         isbn: "123-456-789-X",
         description: "Description",
      });
      Controller.executeAddBookRoute();
      expect(AddBook.bindAddBookButtonClick).toHaveBeenCalledWith(expect.any(Function));
      const callback = AddBook.bindAddBookButtonClick.mock.calls[0][0];
      callback();
      expect(BookManager.addBook).toHaveBeenCalledWith(
         "New Book",
         "Author",
         "123-456-789-X",
         "Description"
      );
      expect(window.location.hash).toBe("#/books");
   });
   
   it("should handle errors during add book route", () => {
      const errorMessage = "Invalid book data";
      AddBook.getFormInputs.mockImplementation(() => {
         throw new Error(errorMessage);
      });
      Controller.executeAddBookRoute();
      const callback = AddBook.bindAddBookButtonClick.mock.calls[0][0];
      callback();
      expect(AddBook.addBook).toHaveBeenCalledWith(new Error(errorMessage));
   });
  });

  describe("updateRatingForBook", () => {
    it('should update the rating and render the sorted and filtered book list', () => {

    const isbn = '12345';
    const rating = 5;
    const currentSearchInput = 'Test';
    const currentSortOption = 'title';

    const mockBooks = [
      { isbn: '12345', title: 'Algorithms' },
      { isbn: '67890', title: 'C Programming' },
    ];

    const filteredBooks = [mockBooks[0]]; 
    const sortedFilteredBooks = [mockBooks[0]]; 

    
    BookManager.updateRating.mockImplementation((isbn, rating) => {
      mockBooks.find((book) => book.isbn === isbn).rating = rating;
    });

    BookManager.getBooks.mockReturnValue(mockBooks);
    filterBooksBySearch.mockReturnValue(filteredBooks);
 
    Controller.updateRatingForBook(isbn, rating, currentSearchInput, currentSortOption);

    expect(BookManager.updateRating).toHaveBeenCalledWith(isbn, rating);
    expect(localStorage.setItem).toHaveBeenCalledWith(isbn, rating);

    expect(BookManager.getBooks).toHaveBeenCalled();
    expect(filterBooksBySearch).toHaveBeenCalledWith(mockBooks, currentSearchInput);


    expect(BooksList.renderBookTable).toHaveBeenCalledWith(sortedFilteredBooks);
  });});

  describe("executeBookDetailRoute", () => {
   it("should execute book detail route and show book details", () => {
      vi.spyOn(Controller, "getBookIsbnFromHash").mockReturnValue("12345");
      BookManager.getBook.mockReturnValue({
         title: "Book 1",
         author: "Author 1",
         isbn: "12345",
      });
      Controller.executeBookDetailRoute();
      expect(BookDetail.renderView).toHaveBeenCalledWith({
         title: "Book 1",
         author: "Author 1",
         isbn: "12345",
      });
   });
  });

  describe("removeBook", () => {
   it("should remove a book and update the view", () => {
      Controller.removeBook("12345");
      expect(BookManager.removeBook).toHaveBeenCalledWith("12345");
      expect(BooksList.removeBook).toHaveBeenCalledWith("12345");
   });
  });

   describe("getBookIsbnFromHash", () => {
   it("should extract ISBN from hash", () => {
      vi.stubGlobal("window", { location: { hash: "#/details/12345" } });
      const isbn = Controller.getBookIsbnFromHash();
      expect(isbn).toBe("12345");
   });

   it("should return null if no ISBN is found", () => {

    vi.stubGlobal("window", {
       location: { hash: "#/book/" }
    });
    const isbn = Controller.getBookIsbnFromHash();
    expect(isbn).toBe("");
 });
  }); 
  
  
   
  });
