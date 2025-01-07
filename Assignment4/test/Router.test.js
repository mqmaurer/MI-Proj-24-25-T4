import { describe, it, expect, vi, beforeEach } from "vitest";
import Router from "../src/controller/Router";
import NotFound from "../src/view/NotFound";
import NavUpdater from "../src/userInterface/NavUpdater";

// Mocking dependencies as classes and ensuring instantiation with 'new'
vi.mock("../src/view/NotFound");
vi.mock("../src/userInterface/NavUpdater");

describe("Router", () => {
  let router;
  let mockNotFoundInstance;
  let mockNavUpdaterInstance;

  // Mocking window and document object before each test
  beforeEach(() => {
    global.window = {
      location: { 
        hash: "", 
        reload: vi.fn(),  // Mocking reload method
      },
      onhashchange: null, // we will manually trigger it later
    };

    global.document = {
      querySelector: vi.fn(() => ({
        innerHTML: '', // Mocking the result of querySelector
        querySelectorAll: vi.fn(() => [
          { classList: { remove: vi.fn() } }, // Mocking an element with classList.remove
        ]), 
      })),
    };

    // Now instantiate Router, which sets window.onhashchange
    router = new Router();

    // Correctly instantiate the mock classes using `new`
    mockNotFoundInstance = new NotFound();
    mockNavUpdaterInstance = new NavUpdater();
    
    // Reset mocks before each test
    vi.resetAllMocks();
  });



  it("should initialize with an empty routes array", () => {
    expect(router.routes).toEqual([]);
  });

  it("should add routes correctly", () => {
    const callback = vi.fn();
    router.addRoute("#/books", callback);

    expect(router.routes).toHaveLength(1);
    expect(router.routes[0]).toEqual({ route: "#/books", callback });
  });

  it("should execute the callback for a matching route", () => {
    const callback = vi.fn();
    router.addRoute("#/books", callback);

    window.location.hash = "#/books";
    router.determineCurrentRouteAndExecuteCallback();

    expect(callback).toHaveBeenCalled();
    expect(mockNavUpdaterInstance.updateActiveInNav).toHaveBeenCalledWith("#/books");
  });

  it("should render the notFoundView when no matching route is found", () => {
    window.location.hash = "#/unknown";
    router.determineCurrentRouteAndExecuteCallback();

    expect(mockNotFoundInstance.renderView).toHaveBeenCalled();
    expect(mockNavUpdaterInstance.updateActiveInNav).not.toHaveBeenCalled();
  });

  it("should redirect to #/books and reload when hash is empty", () => {
    const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});

    window.location.hash = "";
    router.determineCurrentRouteAndExecuteCallback();

    expect(window.location.hash).toBe("#/books");
    expect(reloadSpy).toHaveBeenCalled();

    reloadSpy.mockRestore();
  });

  it("should handle multiple routes and find the correct one", () => {
    const booksCallback = vi.fn();
    const addBooksCallback = vi.fn();

    router.addRoute("#/books", booksCallback);
    router.addRoute("#/addBooks", addBooksCallback);

    window.location.hash = "#/addBooks";
    router.determineCurrentRouteAndExecuteCallback();

    expect(booksCallback).not.toHaveBeenCalled();
    expect(addBooksCallback).toHaveBeenCalled();
    expect(mockNavUpdaterInstance.updateActiveInNav).toHaveBeenCalledWith("#/addBooks");
  });

  it("should not execute any callback if no routes match", () => {
    const callback = vi.fn();
    router.addRoute("#/books", callback);

    window.location.hash = "#/nonexistent";
    router.determineCurrentRouteAndExecuteCallback();

    expect(callback).not.toHaveBeenCalled();
    expect(mockNotFoundInstance.renderView).toHaveBeenCalled();
  });
});
