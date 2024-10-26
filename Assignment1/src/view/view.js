class BookView {
    constructor() {
        this.app = document.getElementById('app');
    }

    displayAddBookForm() {
        this.app.innerHTML = ` 
        <div id="error-message" class="error-message" style="display:none;"></div>

            <form id="addBookForm" >
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
      `;  
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
                            <td><button data-index="${index}" class="details-button" id="detailsButton"> <i class="fa-solid fa-circle-info"></i></button></td>
                            <td><button data-index="${index}" class="delete-button" id="deleteButton"> <i class="fa-solid fa-trash-can"></i></button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>  
            
            </div>
        `;
    }

    bindAddBook(handler) {
        document.getElementById('addBookForm').addEventListener('submit', (e) => {
            console.log('addBook');
            e.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
            const description = document.getElementById('description').value;
            handler(title, author, isbn, description);
           
        });

        this.app.addEventListener('click', (e) => {
          if (e.target.classList.contains('delete-button')) {
            console.log('deleteBook');
            const index = e.target.dataset.index;
            this.handleDeleteBook(index);
        }
      });
    }

        displayBookDetails(book) {
            this.app.innerHTML = `<div class="tab-content mt-3">
                <div class="BookDetail">
                        <div class="card-body book-header">
                            <i class="fa-solid fa-circle-info info-icon"></i>
                            <p class="card-text">Author: ${book.author}</p>
                            <p class="card-title">Title: ${book.title}</p>
                            <p class="card-text">ISBN: ${book.isbn}</p>
                        </div>
                        <div class="card-body book-info">
                            <p>${book.description}</p>
                        </div>
                </div>
        </div>`; 
        }

        setOnDeleteBook(handler) {
            this.onDeleteBook = handler;
          }

          handleDeleteBook(index) {
            if (typeof this.onDeleteBook === 'function') {
                this.onDeleteBook(index);
            }
        }
}


