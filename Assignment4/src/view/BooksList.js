import Animator from "../userInterface/Animator";
import { SORT_OPTIONS } from "../utils/sortBooksBySortOption";

class BooksList {
  static detailButtonClickCallback;

  static removeButtonClickCallback;

  static renderView(books) {
    const view = `
      <div class="container mt-4">
        ${BooksList.renderInputPanel()}
        <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody id="book-list"></tbody>
      </table>
        `;

    document.querySelector("#viewSpace").innerHTML = view;

    BooksList.renderBookTable(books);
  }

  static renderBookTable(books) {
    const $bookList = document.querySelector("#book-list");
    $bookList.innerHTML = "";

    books.forEach((book) => {
      const $row = document.createElement("tr");
      $row.setAttribute("data-isbn", book.isbn);

      $row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
        `;

      const $deleteCell = BooksList.createDeleteCell(book.isbn);
      const $detailCell = BooksList.createDetailCell(book.isbn);
      const $ratingCell = BooksList.createRatingCell(book.rating);

      $row.appendChild($detailCell);
      $row.appendChild($deleteCell);
      $row.appendChild($ratingCell);

      $bookList.appendChild($row);
    });

    BooksList.bindDetailButtonClick();
    BooksList.bindRemoveButtonClick();
    BooksList.bindRatingClick();
  }

  static renderInputPanel() {
    return `
      <div class="form-row">
        <div class="form-group col-sm-4">
          <input type="text" class="form-control" id="inputSearchText" placeholder="Search Text">
        </div>
        <div class="form-group col-sm-3">
          <select id="inputSearchOption" class="form-control">
            <option value="title" selected>Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
          </select>
        </div>
        <div class="form-group col-sm-3">
          <select id="sortOption" class="form-control">
            <option value=${SORT_OPTIONS.NO_SORTING} selected>No Sorting</option>
            <option value=${SORT_OPTIONS.TITLE_ASCENDING}>Title Ascending</option>
            <option value=${SORT_OPTIONS.TITLE_DESCENDING}>Title Descending</option>
            <option value=${SORT_OPTIONS.AUTHOR_ASCENDING}>Author Ascending</option>
            <option value=${SORT_OPTIONS.AUTHOR_DESCENDING}>Author Descending</option>
          </select>
        </div>
        <div class="form-group col-6 col-sm-1">
        <button id="input-panel-submit" class="btn btn-primary btn-block"><i class="fa fa-check"></i></button>
        </div>
        <div class="form-group col-6 col-sm-1">
        <button id="input-panel-reset" class="btn btn-secondary btn-block">X</button>
        </div>
      </div>
    `;
  }

  static resetInputPanel() {
    document.getElementById("sortOption").value = SORT_OPTIONS.NO_SORTING;
    document.getElementById("inputSearchText").value = "";
    document.getElementById("inputSearchOption").value = "title";
  }

  static createDetailCell(isbn) {
    const $detailCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.setAttribute("data-isbn", isbn);
    $link.classList.add("fas", "fa-eye", "text-primary", "detail-button");

    $detailCell.appendChild($link);

    return $detailCell;
  }

  static createDeleteCell(isbn) {
    const $deleteCell = document.createElement("td");
    const $link = document.createElement("a");
    $link.classList.add("fas", "fa-trash", "text-primary", "remove-button");
    $link.setAttribute("data-isbn", isbn);

    $deleteCell.appendChild($link);

    return $deleteCell;
  }

  static createRatingCell(rating) {
    const $ratingCell = document.createElement("td");
    $ratingCell.classList.add("rating");

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.classList.add('star', 'fa-solid', 'fa-star', 'text-success');//solid star, theme color
      if (i <= rating) {
        star.classList.add("filled", 'text-warning');//turn into yellow star after rating
      }
      star.dataset.rating = i;
      $ratingCell.appendChild(star);
    }

    return $ratingCell;
  }

  static bindRatingClick() {
    document.querySelectorAll('.star').forEach((star) => {
      star.addEventListener('click', (e) => {
        const rating = parseInt(e.target.dataset.rating);
        const $ratingCell = e.target.closest('td');

        $ratingCell.querySelectorAll('.star').forEach((s, index) => {
          if (index < rating) {
            s.classList.add('text-warning');//color stars into yellow
            s.classList.remove('text-success');//remove theme color
          } else {
            s.classList.remove('text-warning');//remove yellow color
            s.classList.add('text-success');//back to theme color
          }
        });
      });
    });
  }

  static getSearchInput() {
    const $searchTextField = document.getElementById("inputSearchText");
    const $searchOptionField = document.getElementById("inputSearchOption");

    return {
      searchText: $searchTextField.value,
      searchOption: $searchOptionField.value,
    };
  }

  static bindInputPanelSubmit(callback) {
    const $inputPanelSubmit = document.getElementById("input-panel-submit");

    $inputPanelSubmit.addEventListener("click", (event) => {
      callback(event);
    });
  }

  static bindInputPanelReset(callback) {
    const $inputPanelReset = document.getElementById("input-panel-reset");

    $inputPanelReset.addEventListener("click", (event) => {
      callback(event);
    });
  }

  static getSortOption() {
    const $sortSelect = document.getElementById("sortOption");
    return $sortSelect.value;
  }

  static setDetailButtonClickCallback(callback) {
    BooksList.detailButtonClickCallback = callback;
  }

  static setRemoveButtonClickCallback(callback) {
    BooksList.removeButtonClickCallback = callback;
  }

  static bindDetailButtonClick() {
    const $detailButtons = document.querySelectorAll(".detail-button");

    $detailButtons.forEach(($detailButton) => {
      $detailButton.addEventListener("click", (event) => {
        BooksList.detailButtonClickCallback(event.target.dataset.isbn);
      });
    });
  }

  static bindRemoveButtonClick() {
    const $removeButtons = document.querySelectorAll(".remove-button");

    $removeButtons.forEach(($removeButton) => {
      $removeButton.addEventListener("click", (event) => {
        BooksList.removeButtonClickCallback(event.target.dataset.isbn);
      });
    });
  }

  static removeBook(isbn) {
    const $bookToRemove = document.querySelector(`[data-isbn="${isbn}"]`);

    const remove = () => {
      $bookToRemove.remove();
    };

    Animator.moveToRight($bookToRemove, remove);
  }
}

export default BooksList;
