class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.displayBookList(this.model.getBooks());
        this.navigation();
        this.setupRoutes();
        
       
    }

    setupRoutes() {
        window.addEventListener('hashchange', () => this.navigation());
        // Trigger navigation on initial load
        this.navigation(); 
    }
    
    handleAddBook(title, author, isbn, description) {
        this.model.addBook(title, author, isbn, description);
    }
        handleDeleteBook(index) {
            this.model.deleteBook(index);  // Buch aus dem Modell löschen
           
        }
        showErrorMessage(message) {
            var errorMessage = document.getElementById('error-message');
            errorMessage.innerText = message;
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');

            setTimeout(function() {
                errorMessage.classList.remove('show');
                errorMessage.style.display = 'none';
            }, 3000);
        }

       validateForm(){
            var author = document.getElementById('author').value;
            var title = document.getElementById('title').value;
            var isbn = document.getElementById('isbn').value;
            var description = document.getElementById('description').value;

            if(author === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(title === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(isbn === ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            if(description=== ''){
                showErrorMessage('Please fill in all fields');
                return false;
            }

            var bookListTab = new bootstrap.Tab(document.querySelector('[href="#section1-content"]'));
            bookListTab.show();

            return true;
        }

       navigation(){
        const hash = window.location.hash || '#add';
         if (hash === '#add') {
            this.view.displayAddBookForm();
            }
            else if (hash === '#list') {
                this.view.displayBookList(this.model.getBooks());
            }
        
    }}
