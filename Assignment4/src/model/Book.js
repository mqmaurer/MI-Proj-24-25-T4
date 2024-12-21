class Book {
  constructor(title, author, isbn, description, rating = 1) {
    if (title === "" || author === "" || isbn === "" || description === "") {
      throw new Error("Please fill in all fields");
    }

    Book.isISBNValid(isbn);

    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.rating = rating;
  }

  static isISBNValid(isbn) {
    const isbnRegex = /^(?=[-0-9X ]{13}$)(?:[0-9]+[- ]){3}[0-9]*[X0-9]$/;

    if (!isbnRegex.test((isbn))) {
      throw new Error("ISBN must have 10 digits");
    }
  }
}

export default Book;
