import filterBooksBySearch from "../src/utils/filterBooksBySearch";
import { describe, it, expect } from "vitest";

describe("filterBooksBySearch", () => {
  const books = [
    { title: "JavaScript Basics", author: "Author A" },
    { title: "Advanced CSS", author: "Author B" },
    { title: "Advanced JS", author: "Author C" },
  ];

  it("should return an empty array if books array is empty", () => {
    const searchInput = { searchOption: "title", searchText: "JavaScript" };
    const result = filterBooksBySearch([], searchInput);

    expect(result).toEqual([]);
  });

  it("should return the correct books when a valid searchOption is used", () => {
    const searchInput = { searchOption: "title", searchText: "JavaScript" };
    const result = filterBooksBySearch(books, searchInput);

    expect(result).toEqual([
      { title: "JavaScript Basics", author: "Author A" },
    ]);
  });

  it("should throw a TypeError when searchOption does not exist in book objects", () => {
    const searchInput = {
      searchOption: "invalidOption",
      searchText: "JavaScript",
    };

    expect(() => filterBooksBySearch(books, searchInput)).toThrow(TypeError);
  });

  it("should throw a TypeError if the value of the searchOption is not a string", () => {
    const booksWithNumbers = [
      { title: "JavaScript Basics", author: "Author A", year: 2021 },
      { title: "Advanced CSS", author: "Author B", year: 2022 },
    ];
    const searchInput = { searchOption: "year", searchText: "2021" };

    expect(() => filterBooksBySearch(booksWithNumbers, searchInput)).toThrow(
      TypeError
    );
  });

  it("should handle cases where searchText is an empty string", () => {
    const searchInput = { searchOption: "title", searchText: "" };
    const result = filterBooksBySearch(books, searchInput);

    expect(result).toEqual(books);
  });

  it("should return an empty array if no books match the searchText", () => {
    const searchInput = { searchOption: "title", searchText: "Python" };
    const result = filterBooksBySearch(books, searchInput);

    expect(result).toEqual([]);
  });

  it("should handle null as searchInput", () => {
    expect(() => filterBooksBySearch(books, null)).toThrow(TypeError);
  });

  it("should handle undefined searchInput", () => {
    expect(() => filterBooksBySearch(books, undefined)).toThrow(TypeError);
  });

  it("should return multiple books if they match the searchText", () => {
    const booksWithSameTitle = [
      { title: "JavaScript Basics", author: "Author 1" },
      { title: "JavaScript for Beginners", author: "Author 2" },
    ];

    const searchInput = { searchOption: "title", searchText: "JavaScript" };
    const result = filterBooksBySearch(booksWithSameTitle, searchInput);

    expect(result).toEqual(booksWithSameTitle);
  });
});
