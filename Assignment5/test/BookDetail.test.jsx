import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import BookDetail from "../src/Modules/BookDetail";
import Database from "../src/firebase_local/Database";
import { vi } from "vitest";

// mock database
vi.mock("../src/firebase_local/Database", () => ({
  default: vi.fn(),
}));

describe("BookDetail Test", () => {
  test("srenders loading spinner when isLoading is true", () => {
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
