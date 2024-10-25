class BookView {
    constructor() {
        this.app = document.getElementById('app');
    }

    displayAddBookForm() {
        this.app.innerHTML = ` <div id="error-message" class="error-message" style="display:none;"></div>

        <div class="tab-pane" id="section2-content">


            <form class="form-container" onsubmit="return validateForm()">
                <label for="author">Author</label>
                <input type="text" id="author" name="author">

                <label for="title">Title</label>
                <input type="text" id="title" name="title">

                <label for="isbn">ISBN</label>
                <input type="text" id="isbn" name="isbn">

                <label for="description">Description</label>
                <input type="text" id="description" name="description">

                <button type="submit">+Add Button</button>
            </form>
        </div>`;  // Formular für Buch hinzufügen
    }

    displayBookList(books) {
        if (books.length === 0) {
            this.app.innerHTML = `<h2>Bücherliste</h2><p>Keine Bücher vorhanden.</p>`;
            return;
        }
        
  
        this.app.innerHTML = `
            <h2>Booklist</h2>
             <div class="tab-pane show active" id="section1-content">
            
     
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
            
            </div>
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
            this.app.innerHTML = `<div class="tab-pane" id="section3-content">
            <p>Here you can see the details of a book.</p>
        </div>`; //HTMl für BuchDetails

        }

        setOnDeleteBook(handler) {
            this.onDeleteBook = handler;
          }
}


