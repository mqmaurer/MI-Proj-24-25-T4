import Book from "../src/model/Book";
import { describe, it, expect } from "vitest";


describe("Book", () => {
  it("should create a Book instance with valid data", () => {
    const book = new Book("Title", "Author", "123-456-789-X", "A book description", 0);

    expect(book.title).toBe("Title");
    expect(book.author).toBe("Author");
    expect(book.isbn).toBe("123-456-789-X");
    expect(book.description).toBe("A book description");
    expect(book.rating).toBe(0);
  });

  it("should throw an error if any field is empty", () => {
    expect(() => new Book("", "Author", "123-456-789-X", "Description")).toThrow(
      "Please fill in all fields"
    );
    expect(() => new Book("Title", "", "123-456-789-X", "Description")).toThrow(
      "Please fill in all fields"
    );
    expect(() => new Book("Title", "Author", "", "Description")).toThrow(
      "Please fill in all fields"
    );
    expect(() => new Book("Title", "Author", "123-456-789-X", "")).toThrow(
      "Please fill in all fields"
    );
  });

  it("should throw an error if ISBN is invalid", () => {
    expect(() => new Book("Title", "Author", "12345", "Description")).toThrow(
      "ISBN must have 10 digits"
    );
    expect(() => new Book("Title", "Author", "123-456-789", "Description")).toThrow(
      "ISBN must have 10 digits"
    );
  });

  it("should not throw an error if ISBN is valid", () => {
    expect(() => new Book("Title", "Author", "123-456-789-X", "Description")).not.toThrow();
  });
});
