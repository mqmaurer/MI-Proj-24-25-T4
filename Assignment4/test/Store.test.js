import Store from "../src/model/Store";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Store", () => {
  let mockBooks;

  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

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
    const booksMock = JSON.stringify(mockBooks);
    localStorage.getItem.mockReturnValue(booksMock);
  });

  describe("getBooks", () => {
    it("should return an empty array if localStorage is empty", () => {
      localStorage.getItem.mockReturnValue(null);

      const result = Store.getBooks();
      expect(result).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith("books");
    });

    it("should return a parsed array if localStorage contains data", () => {
      const result = Store.getBooks();
      expect(result).toEqual([
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
      ]);
      expect(localStorage.getItem).toHaveBeenCalledWith("books");
    });

    it("should throw an error if localStorage.getItem fails", () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      expect(() => Store.getBooks()).toThrow();
      expect(localStorage.getItem).toHaveBeenCalledWith("books");
    });
  });

  describe("getBook(isbn)", () => {
    it("should return book if isbn equals book isbn", () => {
      const result1 = Store.getBook("9783-16-148-0");
      const result2 = Store.getBook("0-306-40615-2");

      expect(result1).toEqual({
        title: "Book 1",
        author: "Author 1",
        isbn: "9783-16-148-0",
        description: "Description 1",
      });
      expect(result2).toEqual({
        title: "Book 2",
        author: "Author 2",
        isbn: "0-306-40615-2",
        description: "Description 2",
      });
    });

    it("should return undefined if no books available", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([]));
      const result = Store.getBook("1234");

      expect(result).toBeUndefined();
    });

    it("should return undefined if ISBN does not match any book", () => {
      const result = Store.getBook("9999");

      expect(result).toBeUndefined();
    });
  });

  describe("addBook(book)", () => {
    it("add a book succesfully", () => {
      const book = { title: "Book 3", isbn: "970-123-454-6" };
      Store.addBook(book);
      const updatedBooks = [...mockBooks, book];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "books",
        JSON.stringify(updatedBooks)
      );
    });
  });

  it("should add the first book if localStorage is empty", () => {
    localStorage.getItem.mockReturnValue(null);

    const newBook = { title: "Book 1", isbn: "9783-16-148-0" };
    Store.addBook(newBook);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "books",
      JSON.stringify([newBook])
    );
  });

  it("should add no book if book is null", () => {
    localStorage.getItem.mockReturnValue(null);

    const newBook = null;
    Store.addBook(newBook);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "books",
      JSON.stringify([newBook])
    );
    expect(Store.getBooks()).toEqual([]);
  });

  describe("removeBook(isbn)", () => {
    it("should remove the book with the given ISBN", () => {
      Store.removeBook("9783-16-148-0");

      const updatedBooks = [
        {
          title: "Book 2",
          author: "Author 2",
          isbn: "0-306-40615-2",
          description: "Description 2",
        },
      ];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "books",
        JSON.stringify(updatedBooks)
      );
    });

    it("should do nothing if the ISBN is not found", () => {
      Store.removeBook("9999");

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "books",
        JSON.stringify(mockBooks)
      );
    });

    it("should do nothing if localStorage is empty", () => {
      localStorage.getItem.mockReturnValue("[]");

      Store.removeBook("1234");

      expect(localStorage.setItem).toHaveBeenCalledWith("books", "[]");
    });
  });

  describe("updateRating(isbn, rating)", () => {
    it("should update the rating of the book with the given ISBN", () => {
      const isbnToUpdate = "9783-16-148-0";
      const newRating = 4;

      Store.updateRating(isbnToUpdate, newRating);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        isbnToUpdate,
        newRating
      );

      const updatedBooks = [
        {
          title: "Book 1",
          author: "Author 1",
          isbn: "9783-16-148-0",
          description: "Description 1",
          rating: newRating,
        },
        {
          title: "Book 2",
          author: "Author 2",
          isbn: "0-306-40615-2",
          description: "Description 2",
        },
      ];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "books",
        JSON.stringify(updatedBooks)
      );
    });

    it("should not update anything if the ISBN is not found", () => {
      const isbnToUpdate = "9999";
      const newRating = 3;

      Store.updateRating(isbnToUpdate, newRating);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        isbnToUpdate,
        newRating
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "books",
        JSON.stringify(mockBooks)
      );
    });
  });
});
