class BookController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.manageTheme();
    this.navigation();
    this.setupRoutes();
    this.showSuccessMessage = false;
    this.view.setOnDeleteBook(this.handleDeleteBook.bind(this));
  }

  // Functions for managing hash-routing, view & highlighting current position at Navbar
  setupRoutes() {
    window.addEventListener("hashchange", () => this.navigation());
    // Trigger navigation on initial load
    this.navigation();
  }
  navigation() {
    const hash = window.location.hash || "#add";
    const index = this.getDetailIndexFromHash(hash);
    // Show sites according to hash value
    if (hash === "#add") {
      this.view.displayAddBookForm();
      this.view.bindAddBook(this.handleAddBook.bind(this));
    } else if (hash === "#list") {
      this.view.displayBookList(this.model.getBooks());
      if (this.showSuccessMessage) {
        this.showMessage("success", "Book added successfully");
        this.showSuccessMessage = false;
      }
    } else if (hash.startsWith("#details")) {
      this.handleBookDetails(index);
    } else if (hash === "#zeroDetails") {
      this.view.displayZeroDetails();
    } else {
      this.view.displayErrorPage();
    }
    this.manageView();
    this.higlightLocationAtNavbar(hash);
  }
  getDetailIndexFromHash(hash) {
    // Create Index for each saved book
    const match = hash.match(/#details\-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }
  manageView() {
    document.querySelector("#anchor").scrollIntoView(false);
  }
  higlightLocationAtNavbar(hash) {
    if (document.querySelector(".nav-link.active") !== null) {
      document.querySelector(".nav-link.active").classList.remove("active");
    }
    if (hash !== "#error" && hash !== "#details") {
      document.querySelector(hash).classList.add("active");
    } else if (hash === "#details") {
      document.querySelector("#zeroDetails").classList.add("active");
    }
  }

  manageTheme() {
    const lightTheme = "css/bootstrap.light.min.css";
    const darkTheme = "css/bootstrap.dark.min.css";
    const themeToggleButton = document.querySelector("#theme-toggle");
    const themeStylesheet = document.querySelector("#theme-stylesheet");
    // Initial load of theme button
    if (themeStylesheet.getAttribute("href") === lightTheme) {
      document.querySelector(".fa-moon").classList.remove("hidden");
    } else {
      document.querySelector(".fa-sun").classList.remove("hidden");
    }

    themeToggleButton.addEventListener("click", () => {
      if (themeStylesheet.getAttribute("href") === lightTheme) {
        themeStylesheet.setAttribute("href", darkTheme);
        document.querySelector(".fa-moon").classList.add("hidden");
        document.querySelector(".fa-sun").classList.remove("hidden");
      } else {
        themeStylesheet.setAttribute("href", lightTheme);
        document.querySelector(".fa-sun").classList.add("hidden");
        document.querySelector(".fa-moon").classList.remove("hidden");
      }
    });
  }

  // Functions for handling all book releated actions, including notifications and animations
  handleAddBook(title, author, isbn, description) {
    if (this.validateForm()) {
      this.model.addBook(title, author, isbn, description);
      this.showSuccessMessage = true;
      window.location.hash = "#list";
    }
  }
  // function to handle the deletion of a book and the animation to remove it from the list
  handleDeleteBook(index) {
    const bookDetail = document.querySelector(`#bookDetail-${index}`);
    if (bookDetail) {
      anime({
        targets: bookDetail,
        translateX: 500,
        opacity: 0,
        duration: 800,
        easing: "easeInOutSine",
        complete: () => {
          this.model.deleteBook(index);
          this.view.displayBookList(this.model.getBooks());
        },
      });
    } else {
      this.model.deleteBook(index);
      this.view.displayBookList(this.model.getBooks());
    }
  }
  handleBookDetails(index) {
    const book = this.model.getBooks()[index];
    this.view.displayBookDetails(book);
  }
  // function to show a message to the user and to animate the message
  showMessage(type, message) {
    let finalMessage;
    if (type === "error") {
      finalMessage = document.querySelector("#error-message");
    } else if (type === "success") {
      finalMessage = document.querySelector("#success-message");
    }
    if (finalMessage) {
      this.manageView();
      finalMessage.innerText = message;
      finalMessage.style.display = "block";
      finalMessage.classList.add("show");
      anime({
        targets: finalMessage,
        opacity: [0, 1],
        duration: 1000,
        easing: "easeInOutSine",
        complete: () => {
          setTimeout(() => {
            anime({
              targets: finalMessage,
              opacity: [1, 0],
              duration: 1000,
              easing: "easeInOutSine",
              complete: () => {
                finalMessage.style.display = "none";
              },
            });
          }, 3000);
        },
      });
    }
  }
//  function to handle the validation of the form
  validateForm() {
    const author = document.querySelector("#author").value.trim();
    const title = document.querySelector("#title").value.trim();
    const isbn = document.querySelector("#isbn").value.trim();
    const description = document.querySelector("#description").value.trim();
    if (author === "" || title === "" || isbn === "" || description === "") {
      this.showMessage("error", "Please fill in all fields");
      return false;
    }
    // validation of ISBN
    const isbnRegex = /^(?=.*\d)(?=.{13}$)(\d{1,7}-\d{1,7}-\d{1,7}-[0-9X])$/;
    if (!isbnRegex.test(isbn)) {
      this.showMessage("error", "Invalid ISBN format. Example: 0-9752298-0-X");
      return false;
    }
    // check for existing ISBNs
    const books = this.model.getBooks();
    const isDuplicate = books.some((book) => book.isbn === isbn);
    if (isDuplicate) {
      this.showMessage("error", "This ISBN already exists in the book list.");
      return false;
    }
    return true;
  }
}
