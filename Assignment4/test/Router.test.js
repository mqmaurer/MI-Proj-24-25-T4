import { describe, it, expect, vi } from "vitest";
import Router from "../src/controller/Router";

describe("Router", () => {
  let router;
  let mockNotFound;
  let mockNavUpdater;

  beforeEach(() => { 
    router = new Router();
    mockNotFound = {
      renderView: vi.fn(),
    };
    mockNavUpdater = {
      updateActiveInNav: vi.fn(),
    };

    vi.mock("../src/view/NotFound", () => mockNotFound);
    vi.mock("../src/userInterface/NavUpdater", () => mockNavUpdater);

   
  });

  it("should add routes", () => {
    const callback = vi.fn();
    router.addRoute("#/books", callback);

    expect(router.routes.length).toBe(1); //? bin nicht sicher, ob wir das brauch ist von der autovorgabe, noch zu prüfen
    expect(router.routes[0]).toEqual({ route: "#/books", callback });
  });

  it("should determine current route and execute callback for matching routes", () => {
    const callback = vi.fn();
    router.addRoute("#/books", callback);

    window.location.hash = "#/books";
    router.determineCurrentRouteAndExecuteCallback();

    expect(callback).toHaveBeenCalled();
    expect(mockNavUpdater.updateActiveInNav).toHaveBeenCalledWith("#/books");
  });

  it("should call notFoundView.renderView for not found", () => {
    window.location.hash = "#/test";
    router.determineCurrentRouteAndExecuteCallback();

    expect(mockNotFound.renderView).toHaveBeenCalled();
  });

  it("should redirect to #/books and reload when hash is empty", () => {
    const reload = vi.spyOn(window.location, "reload").mockImplementation(() => {});

    window.location.hash = "";
    router.determineCurrentRouteAndExecuteCallback();

    expect(window.location.hash).toBe("#/books");
    expect(reload).toHaveBeenCalled();

    reload.mockRestore();
  });
});
