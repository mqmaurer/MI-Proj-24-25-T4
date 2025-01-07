import { describe, it, vi, expect, beforeEach } from "vitest";
import Controller from "../src/controller/Controller";
import Router from "../src/controller/Router";
import ThemeSwitcher from "../src/userInterface/ThemeSwitcher";
import BookManager from "../src/model/BookManager";
import BooksList from "../src/view/BooksList";
import AddBook from "../src/view/AddBook";
import BookDetail from "../src/view/BookDetail";

// Mocking dependencies
vi.mock("../src/controller/Router");
vi.mock("../src/userInterface/ThemeSwitcher");
vi.mock("../src/model/BookManager");
vi.mock("../src/view/BooksList");
vi.mock("../src/view/AddBook");
vi.mock("../src/view/BookDetail");

describe("Controller", () => {
  let controller;

  beforeEach(() => {
    controller = new Controller();
  

 
  vi.stubGlobal("window", {
    location: {
      hash: "",
    },
  });
});

  it("should initialize  and call Router and ThemeSwitcher", () => {
    controller.init();

    expect(controller.router.determineCurrentRouteAndExecuteCallback).toHaveBeenCalled();
    expect(controller.themeSwitcher.init).toHaveBeenCalled();
  });

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

  it("should execute book list route and render books", () => {
    BookManager.getBooks.mockReturnValue([{ title: "Book 1", author: "Author 1" }]);
    Controller.executeBookListRoute();

    expect(BooksList.renderView).toHaveBeenCalledWith([
      { title: "Book 1", author: "Author 1" },
    ]);
  });

  it("should execute add book  and handle form ", () => {
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

  it("should remove a book and update the view", () => {
    Controller.removeBook("12345");

    expect(BookManager.removeBook).toHaveBeenCalledWith("12345");
    expect(BooksList.removeBook).toHaveBeenCalledWith("12345");
  });

  it("should extract ISBN from hash", () => {
    vi.stubGlobal("window", { location: { hash: "#/details/12345" } });

    const isbn = Controller.getBookIsbnFromHash();
    expect(isbn).toBe("12345");
  });
});
