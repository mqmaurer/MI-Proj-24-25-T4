class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.navigation();
        this.setupRoutes();
        
        this.view.setOnDeleteBook(this.handleDeleteBook.bind(this));
       
    }

    setupRoutes() {
        window.addEventListener('hashchange', () => this.navigation());
        // Trigger navigation on initial load
        this.navigation(); 
    }

    navigation(){
        const hash = window.location.hash || '#add';
         if (hash === '#add') {
            this.view.displayAddBookForm();
            this.view.bindAddBook(this.handleAddBook.bind(this));
            }
            else if (hash === '#list') {
                this.view.displayBookList(this.model.getBooks());
            }
        
    }
    
    handleAddBook(title, author, isbn, description) {
        console.log('addBook');
        if (this.validateForm()) {
        this.model.addBook(title, author, isbn, description);
        window.location.hash = '#list';
    }
    }
    handleDeleteBook(index) {
            this.model.deleteBook(index);  
            window.location.hash = '#list'; // Buch aus dem Modell löschen
           
    }
    handleBookDetails(index) {
        const book = this.model.getBooks()[index];
        this.view.displayBookDetails(book);
    }
    showErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.innerText = message;
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');
    
            setTimeout(() => {
                errorMessage.classList.remove('show');
                errorMessage.style.display = 'none';
            }, 3000);
        }
    }

       validateForm(){
            var author = document.getElementById('author').value;
            var title = document.getElementById('title').value;
            var isbn = document.getElementById('isbn').value;
            var description = document.getElementById('description').value;
            console.log(author); // Fehlermeldung anzeigen
            if (author === '' || title === '' || isbn === '' || description === '') {
                this.showErrorMessage('Please fill in all fields');
                console.log('Fehlermeldung 1'); // Fehlermeldung anzeigen
                return false;
            }
            // Regex für gültiges ISBN-Format
            const isbnRegex = /^(?:\d{1,5}-){2}\d{1,7}-[\dX]$/;
            if (!isbnRegex.test(isbn)){
                this.showErrorMessage('Invalid ISBN format. Example: 0-9752298-0-X');
                console.log('Fehlermeldung 2'); // Fehlermeldung anzeigen
                return false;
            }

            const books = this.model.getBooks(); // Aktuelle Bücherliste abrufen
            const isDuplicate = books.some(book => book.isbn === isbn);
            if (isDuplicate) {
                this.showErrorMessage('This ISBN already exists in the book list.');
                console.log('Fehlermeldung 3'); // Fehlermeldung anzeigen
                return false; // ISBN ist nicht einzigartig
            }


            console.log('Richtung'); // Fehlermeldung anzeigen
            return true;
        }

       }
