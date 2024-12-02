import { Animator } from "../userInterface/Animator.js";


export function BooksList(SearchAndSortCallback) {
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
              <button type="submit" id="searchButton" class="btn btn-success pl-3 pr-3"><i class="fa fa-check"></i></button>
              <button type="reset" id="resetButton" class="btn btn-danger pl-3 pr-3 ml-2">✖</button>
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

  function bindSearchButtonClick() {
    const $searchButton = document.querySelector("#searchButton");
    const inputText = document.querySelector("#inputSearchText");
    const sanitizedInput = safeInput(inputText.value); // Bereinige die Eingabe
    const searchOption = document.querySelector("#searchOption").value; // Wähle Suchoption aus
    const sortOption = document.querySelector("#sortOption").value; // Wähle Sortieroption aus
  
    $searchButton.addEventListener("click", () => {
      // Die Eingabedaten an den Controller weitergeben
      SearchAndSortCallback(sanitizedInput, searchOption, sortOption);
    });
  }

  function safeInput(input) {
    // Remove special characters from given input
    return input.replace(/[/\\#,+()$~%.^'"*<>{}]/g, "");
  }

  function bindResetButtonClick(books) {
    const $resetButton = document.querySelector("#resetButton");

    $resetButton.addEventListener("click", () => {
      // Reset of tableview
      renderView(books); //has to be tested, otherwise new func for deleting all rows + addBooksToTable(books) here
    });
  }

  function addBooksToTable(books) {
    books.forEach(function (book) {
      addBookAsTableRow(book);
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

    for (const element of $detailButtons) {
      const $detailButton = element;
      $detailButton.addEventListener("click", function (event) {
        callback(event);
      });
    }
  }

  function bindRemoveButtonClick(callback) {
    const $removeButtons = document.querySelectorAll(".remove-button");

    for (const element of $removeButtons) {
      const $removeButton = element;
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
    bindSearchButtonClick: bindSearchButtonClick,
    bindResetButtonClick: bindResetButtonClick,
    removeBook: removeBook,
    bindRemoveButtonClick: bindRemoveButtonClick,
    bindDetailButtonClick: bindDetailButtonClick,
    renderView: renderView,
  };
}
