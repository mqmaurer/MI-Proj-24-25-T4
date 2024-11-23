function AddBook() {
  const $viewSpace = document.querySelector("#viewSpace");

  const animator = Animator();
  const messageBox = MessageBox("#message-box", animator);

  function renderView() {
    const view = `
          <div class="container mt-4">
              <form id="book-form">
                <div class="form-group">
                  <label for="author">Author</label>
                  <input type="text" id="author" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="title">Titel</label>
                  <input type="text" id="title" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="isbn">ISBN</label>
                  <input type="text" id="isbn" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description" rows="3"></textarea>
              </div>
                <button type="submit" class="btn btn-primary btn-block add-button">
                  <i class="fas fa-plus"></i> Add Book
                </button>
              </form>
          </div>
          `;

    $viewSpace.innerHTML = view;
  }

  function addBook(error) {
    if (error) {
      messageBox.showMessage(error, "alert-danger");
      return;
    }
    // Show success when book was added to UI
    messageBox.showMessage("Book Added", "alert-success");

    // Clear fields
    clearFields();
  }

  function bindAddBookButtonClick(callback) {
    const $addButton = document.querySelector(".add-button");

    $addButton.addEventListener("click", function (event) {
      event.preventDefault();
      callback(event);
    });
  }

  function clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  function getFormInputs() {
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const description = document.querySelector("#description").value;

    return { title, author, isbn, description };
  }

  return {
    getFormInputs: getFormInputs,
    clearFields: clearFields,
    addBook: addBook,
    bindAddBookButtonClick: bindAddBookButtonClick,
    renderView: renderView,
  };
}
