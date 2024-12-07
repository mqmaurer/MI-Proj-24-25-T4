class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      const booksFromStorage = localStorage.getItem("books");
      books = JSON.parse(booksFromStorage);
    }

    return books;
  }

  static getBook(isbn) {
    const books = Store.getBooks();

    return books.find((book) => {
      if (book.isbn === isbn) {
        return book;
      }
      return undefined;
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static updateRating(isbn, rating) {
    const books = Store.getBooks();
    const updatedBooks = books.map((book) => {
      if (book.isbn === isbn) {
        book.rating = rating;
      }
      return book;
    });
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  }
}

export default Store;
