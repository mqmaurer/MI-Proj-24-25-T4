import MessageBox from "../userInterface/MessageBox";

class AddBook {
  static renderView() {
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

    document.querySelector("#viewSpace").innerHTML = view;
  }

  static addBook(error) {
    if (error) {
      MessageBox.showMessage(error, "alert-danger");
      return;
    }
    // Show success when book was added to UI
    MessageBox.showMessage("Book Added", "alert-success");
  }

  static bindAddBookButtonClick(callback) {
    const $addButton = document.querySelector(".add-button");

    $addButton.addEventListener("click", (event) => {
      event.preventDefault();
      callback(event);
    });
  }

  static getFormInputs() {
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const description = document.querySelector("#description").value;

    return {
      title,
      author,
      isbn,
      description,
    };
  }
}

export default AddBook;
