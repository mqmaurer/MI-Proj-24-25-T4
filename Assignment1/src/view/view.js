class BookView {
    constructor() {
        this.app = document.getElementById('app');
    }

    displayAddBookForm() {
        this.app.innerHTML = ``;  // Formular für Buch hinzufügen
    }

    displayBookList(books) {
        if (books.length === 0) {
            this.app.innerHTML = `<h2>Bücherliste</h2><p>Keine Bücher vorhanden.</p>`;
            return;
        }
  
        this.app.innerHTML = `
            <h2>Booklist</h2>
            <table class="table table-hover" is="list">
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Details</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="bookList">
                    ${books.map((book, index) => `
                        <tr  class="table-light">
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td><button data-index="${index}" class="details-button" id="detailsButton"> icon 1</button></td>
                            <td><button data-index="${index}" class="delete-button" id="deleteButton"> icon 2</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    bindAddBook(handler) {
        document.getElementById('Name vom Form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
            const description = document.getElementById('description').value;
            handler(title, author, isbn, description);
            
        });

        this.app.addEventListener('click', (e) => {
          if (e.target.classList.contains('delete-button')) {
            const index = e.target.dataset.index;
            this.handleDeleteBook(index);
        }
      });
    }

        displayBookDetails(book) {
            this.app.innerHTML = ``; //HTMl für Buch hinzufügen

        }

        setOnDeleteBook(handler) {
            this.onDeleteBook = handler;
          }
}


