import BookManager from "../src/model/BookManager";
import Store from "../src/model/Store";
import { vi, describe, beforeEach, it, expect } from "vitest";

vi.mock("../src/model/Store", () => ({
  default: {
    getBooks: vi.fn(),
    getBook: vi.fn(),
    addBook: vi.fn(),
    removeBook: vi.fn(),
  },
}));

describe("BookManager", () => {
  let mockBooks;

  beforeEach(() => {
    vi.clearAllMocks();
    mockBooks = [
      {
        title: "Book 1",
        author: "Author 1",
        isbn: "9783-16-148-0",
        description: "Description 1",
      },
      {
        title: "Book 2",
        author: "Author 2",
        isbn: "0-306-40615-2",
        description: "Description 2",
      },
    ];

    Store.getBooks.mockReturnValue(mockBooks);
  });

  describe("getBooks", () => {
    it("should return all books", () => {
      const books = BookManager.getBooks();

      expect(Store.getBooks).toHaveBeenCalled();
      expect(books).toEqual(mockBooks);
    });

    it("should return empty array if no books available", () => {
      Store.getBooks.mockReturnValue([]);
      const books = BookManager.getBooks();

      expect(Store.getBooks).toHaveBeenCalled();
      expect(books).toEqual([]);
    });
  });

  describe("getBook", () => {
    it("should return a book by ISBN", () => {
      const isbn = "9783-16-148-0";
      const mockBook = mockBooks[0];
      Store.getBook.mockReturnValue(mockBook);
      const book = BookManager.getBook(isbn);
      expect(Store.getBook).toHaveBeenCalledWith(isbn);
      expect(book).toEqual(mockBook);
    });
  });

  describe("addBook", () => {
    it("should add a book if ISBN does not exist", () => {
      const newBook = {
        title: "Book 3",
        author: "Author 3",
        isbn: "970-123-454-6",
        description: "Description 3",
      };

      BookManager.addBook(
        newBook.title,
        newBook.author,
        newBook.isbn,
        newBook.description
      );

      expect(Store.addBook).toHaveBeenCalledWith(
        expect.objectContaining(newBook)
      );
    });

    it("should throw an error if ISBN already exists", () => {
      const duplicateISBN = "0-306-40615-2";

      expect(() => {
        BookManager.addBook(
          "Duplicate Book",
          "Author",
          duplicateISBN,
          "Duplicate Description"
        );
      }).toThrow("ISBN already exists");
    });
  });

  describe("doesISBNAlreadyExist", () => {
    it("should check if ISBN exists correctly", () => {
      const existingISBN = "0-306-40615-2";
      const nonExistingISBN = "0-306-40615-3";

      const result1 = BookManager.doesISBNAlreadyExist(mockBooks, existingISBN);
      const result2 = BookManager.doesISBNAlreadyExist(
        mockBooks,
        nonExistingISBN
      );

      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });
  });

  describe("removeBook", () => {
    it("should remove a book by ISBN", () => {
      const isbnToRemove = "0-306-40615-2";

      BookManager.removeBook(isbnToRemove);

      expect(Store.removeBook).toHaveBeenCalledWith(isbnToRemove);
    });
  });
});

//dieser kommentar ist für einen Test-Commit
