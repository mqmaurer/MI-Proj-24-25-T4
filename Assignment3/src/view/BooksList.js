import { Animator } from "../userInterface/Animator.js";

export function BooksList() {
  const $viewSpace = document.querySelector("#viewSpace");

  const animator = Animator();

  function renderView(books) {
    const view = `
      <div class="container mt-2">
        <form>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputSearchText"></label>
              <input type="text" class="form-control" id="inputSearchText" placeholder="Search Text">
            </div>
            <div class="form-group col-md-3">
              <label for="searchOption"></label>
              <select id="searchOption" class="form-control">
                <option selected>Title</option>
                <option>Author</option>
                <option>ISBN</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="sortOption"></label>
              <select id="sortOption" class="form-control">
                <option selected>No sorting</option>
                <option>Title Ascending</option>
                <option>Title Descending</option>
                <option>Author Ascending</option>
                <option>Author Descending</option>
              </select>
            </div>
            <div class="col-md-2 mt-2 align-self-center">
              <button type="submit" class="btn btn-success pl-3 pr-3"><i class="fa fa-check"></i></button>
              <button type="button" class="btn btn-danger pl-3 pr-3 ml-2">✖</button>
            </div>
          </div>
        </form>
        <table class="table table-striped mt-5">
          <thead>
           <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="book-list"></tbody>
        </table>
      </div>
      `;

    $viewSpace.innerHTML = view;
    addBooksToTable(books);
  }

  function addBooksToTable(books) {
    books.forEach(function (book) {
      addBookAsTableRow(book, true);
    });
  }

  function addBookAsTableRow(book) {
    const $bookList = document.querySelector("#book-list");
    const $row = document.createElement("tr");
    $row.setAttribute("data-isbn", book.isbn);

    $row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
        `;

    const $deleteCell = createDeleteCell(book.isbn);
    const $detailCell = createDetailCell(book.isbn);

    $row.appendChild($detailCell);
    $row.appendChild($deleteCell);

    $bookList.insertBefore($row, $bookList.firstChild);
  }

  function createDetailCell(isbn) {
    const $detailCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.setAttribute("data-isbn", isbn);
    $link.classList.add("fas", "fa-eye", "text-primary", "detail-button");

    $detailCell.appendChild($link);

    return $detailCell;
  }

  function createDeleteCell(isbn) {
    const $deleteCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.classList.add("fas", "fa-trash", "text-primary", "remove-button");
    $link.setAttribute("data-isbn", isbn);

    $deleteCell.appendChild($link);

    return $deleteCell;
  }

  function bindDetailButtonClick(callback) {
    const $detailButtons = document.querySelectorAll(".detail-button");

    for (let index = 0; index < $detailButtons.length; index++) {
      const $detailButton = $detailButtons[index];
      $detailButton.addEventListener("click", function (event) {
        callback(event);
      });
    }
  }

  function bindRemoveButtonClick(callback) {
    const $removeButtons = document.querySelectorAll(".remove-button");

    for (let index = 0; index < $removeButtons.length; index++) {
      const $removeButton = $removeButtons[index];
      $removeButton.addEventListener("click", function (event) {
        callback(event);
      });
    }
  }

  function removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    function remove() {
      $bookToRemove.remove();
    }

    animator.moveToRight($bookToRemove, remove);
  }

  return {
    removeBook: removeBook,
    bindRemoveButtonClick: bindRemoveButtonClick,
    bindDetailButtonClick: bindDetailButtonClick,
    renderView: renderView,
  };
}
