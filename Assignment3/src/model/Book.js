function Book(title, author, isbn, description) {
  if (title === "" || author === "" || isbn === "" || description === "") {
    throw new Error("Please fill in all fields");
  }

  const isbnRegex = /^(?=[-0-9X ]{13}$)(?:[0-9]+[- ]){3}[0-9]*[X0-9]$/;

  if (!isbnRegex.test(isbn)) {
    throw new Error("The provided ISBN isn't valid");
  }

  return {
    title: title,
    author: author,
    isbn: isbn,
    description: description,
  };
}
