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

    navigation() {
        const hash = window.location.hash || '#add';
        const index = this.getDetailIndexFromHash(hash);
        if (hash === '#add') {
            this.view.displayAddBookForm();
            this.view.bindAddBook(this.handleAddBook.bind(this));
            this.higlightLocationAtNavbar('#add');
        }
        else if (hash === '#list') {
            this.view.displayBookList(this.model.getBooks());
            this.higlightLocationAtNavbar('#list');
        }
        else if (hash.startsWith('#details')) {
            this.handleBookDetails(index);
            this.higlightLocationAtNavbar('#details');
        }
        else if (hash === '#zeroDetails') {
            this.view.displayZeroDetails();
            this.higlightLocationAtNavbar('#zeroDetails');
        }
        else {
            this.view.displayErrorPage();
            this.higlightLocationAtNavbar('#error');
        }
    }
    getDetailIndexFromHash(hash) {
        const match = hash.match(/#details\-(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    }
    higlightLocationAtNavbar(currentHash) {
        if (document.querySelector('.nav-link.active') !== null) {
            document.querySelector('.nav-link.active').classList.remove('active');
        }
        if (currentHash !== '#error' && currentHash !== '#details') {
            document.querySelector(currentHash).classList.add('active');
        }
        else if (currentHash === '#details') {
            document.querySelector('#zeroDetails').classList.add('active');
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

    validateForm() {
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const isbn = document.getElementById('isbn').value;
        const description = document.getElementById('description').value;
        console.log(author); // Fehlermeldung anzeigen
        if (author === '' || title === '' || isbn === '' || description === '') {
            this.showErrorMessage('Please fill in all fields');
            return false;
        }
        // Regex für gültiges ISBN-Format
        const isbnRegex = /^(?=.*\d)(?=.{13}$)(\d{1,7}-\d{1,7}-\d{1,7}-[0-9X])$/;
        if (!isbnRegex.test(isbn)) {
            this.showErrorMessage('Invalid ISBN format. Example: 0-9752298-0-X');
            return false;
        }

        const books = this.model.getBooks(); // Aktuelle Bücherliste abrufen
        const isDuplicate = books.some(book => book.isbn === isbn);
        if (isDuplicate) {
            this.showErrorMessage('This ISBN already exists in the book list.');
            return false; // ISBN ist nicht einzigartig
        }
        return true;
    }
}
