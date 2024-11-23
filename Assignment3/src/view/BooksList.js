function BooksList() {
  const $viewSpace = document.querySelector("#viewSpace");

  const animator = Animator();

  function renderView(books) {
    const view = `
      <div class="container mt-4">
        <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="book-list"></tbody>
      </table>
      <div class="container mt-4">
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
