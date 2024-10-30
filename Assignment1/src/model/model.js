class BookModel {
  // functions for adding, getting and deleting books and loading and saving books to local storage

  constructor() {
    this.books = this.loadBooksFromLocalStorage() || [];
  }

  loadBooksFromLocalStorage() {
    const booksJson = localStorage.getItem("books");
    return booksJson ? JSON.parse(booksJson) : [];
  }

  saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  addBook(title, author, isbn, description) {
    const timestamp = Date.now();
    this.books.push({ title, author, isbn, description, timestamp });
    this.saveBooksToLocalStorage();
  }

  getBooks() {
    return this.books.sort((a, b) => b.timestamp - a.timestamp);
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
  }
}
