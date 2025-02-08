import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import BookDetail from "../src/Modules/BookDetail";
import Database from "../src/firebase_local/Database";
import { vi } from "vitest";

/**
 * @fileoverview Unit tests for the BookDetail component using React Testing Library and Vitest.
 *
 * These tests verify the functions of the BookDetail component including:
 * 1. Displays a loading spinner when fetching data.
 * 2. Shows a "No Book selected" message when no book available in the BooksList.
 * 3. Correctly renders book details when a book object is available.
 *
 */

// mock database
vi.mock("../src/firebase_local/Database", () => ({
  default: vi.fn(),
}));

describe("BookDetail Test", () => {
  /**
   * Test: Renders a loading spinner when isLoading is true.
   */
  test("renders loading spinner when isLoading is true", () => {
    Database.mockReturnValue({
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <BookDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  /**
   * Test: Displays 'No Book selected!!!' when no book is provided.
   */
  test("renders 'No Book selected!!!' when no book is provided", () => {
    Database.mockReturnValue({
      isLoading: false,
      book: null,
    });

    render(
      <MemoryRouter>
        <BookDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("No Book selected!!!")).toBeInTheDocument();
  });
  /**
   * Test: Renders book details correctly when a book object is provided.
   */
  test("renders book details when a book is provided", () => {
    Database.mockReturnValue({
      isLoading: false,
    });
    const mockBook = {
      author: "John Doe",
      title: "Test Book",
      isbn: "123-456-789",
      description: "This is a test book.",
    };

    render(
      <MemoryRouter initialEntries={[{ state: { book: mockBook } }]}>
        <BookDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(`Author: ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByText(`Title: ${mockBook.title}`)).toBeInTheDocument();
    expect(screen.getByText(`ISBN: ${mockBook.isbn}`)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();
  });
});
