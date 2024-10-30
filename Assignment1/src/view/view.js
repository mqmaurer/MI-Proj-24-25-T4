class BookView {
  constructor() {
    this.app = document.querySelector("#app");
  }
  // This function will display the form to add a new book.
  displayAddBookForm() {
    this.app.innerHTML = ` 
      <div id="error-message" class="alert alert-dismissible alert-danger mb-3" style="display:none; max-width: 50rem; margin: 0 auto;"></div>
      <div class="card border-primary mb-3" style="max-width: 60rem; margin: 0 auto;">
          <form id="addBookForm">
            <div class="row m-3">
                <div class="col">
                  <label for="author" class="form-label">Author</label>
                  <input type="text" id="author" name="author" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" id="title" name="title" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="isbn" class="form-label">ISBN</label>
                  <input type="text" id="isbn" name="isbn" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="description" class="form-label">Description</label>
                  <textarea id="description" name="description" class="form-control"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="text-center m-3">
                    <button type="submit" class="btn btn-primary">Add Book</button>
                </div>
            </div>
          </form>
      </div>`;
  }

  displayBookList(books) {
    // If there aren't any saved books, an information message will be shown.
    if (books.length === 0) {
      this.app.innerHTML = `
        <h2>Book List</h2>
        <p>No books available yet.</p>`;
      return;
    }

    // If there's at least 1 saved book, a booklist will be shown.
    this.app.innerHTML = `
      <div id="success-message" class="alert alert-dismissible alert-success mb-3" style="display:none; max-width: 50rem;margin: 0 auto;"></div>
      <h2>Book List</h2>
      <table class="table table-hover" is="list" style="max-width: 95vw; margin: 0 auto;">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="bookList">
          ${books
        .map(
          (book, index) => `
            <tr id="bookDetail-${index}" class="table-light">
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><button data-index="${index}" class="details-button" id="detailsButton" onclick="location.hash='details-${index}'"> <i class="fa-solid fa-circle-info"></i></button></td>
              <td><button data-index="${index}" class="delete-button" id="deleteButton"> <i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`
        )
        .join("")}
        </tbody>
      </table>`;

    this.app.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.closest("button").dataset.index;
        this.handleDeleteBook(index);
      });
    });
  }

  displayZeroDetails() {
    // If the 'details tab' is clicked on at the navbar, a message will be shown to first choose a book at 'Book List'
    this.app.innerHTML = `
      <h2>Nothing found here!</h2>
      <p>Please make sure to select a book at <a href=#list>Book List</a>.<br>
        Details will then be shown here!</p>`;
  }

  // This function will display detailed information for the book chosen by the user.
  displayBookDetails(book) {
    this.app.innerHTML = `
    <div class="tab-content mt-3">
      <div class="card border-primary mb-3" style="max-width: 40rem; margin: 0 auto;">
        <div class="card-header">
          <i class="fa-solid fa-circle-info info-icon"></i>
          <p class="card-text">Author: ${book.author}</p>
          <p class="card-text">Title: ${book.title}</p>
          <p class="card-text">ISBN: ${book.isbn}</p>
        </div>
        <div class="card-body book-info text-break">
          <p>${book.description}</p>
        </div>
      </div>
    </div>`;
  }

  // 404 error page
  displayErrorPage() {
    this.app.innerHTML = `
        <h2>404</h2>
        <h4>UH OH! You're lost.</h4>
        <p>The page you are looking for does not exist.<br>
          How you got here is a mystery.<br>
          If you want a safer place to stay, just go to <a href=#list>Book List</a>.
        </p>`;
  }

  // function to handle book addition
  bindAddBook(handler) {
    document.querySelector("#addBookForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const isbn = document.querySelector("#isbn").value;
      const description = document.querySelector("#description").value;
      handler(title, author, isbn, description);
    });
  }

  // functions to handle book deletion
  setOnDeleteBook(handler) {
    this.onDeleteBook = handler;
  }
  handleDeleteBook(index) {
    if (typeof this.onDeleteBook === "function") {
      this.onDeleteBook(index);
    }
  }
}
