class BookModel {
    constructor() {
        this.books = this.loadBooksFromLocalStorage() || [];
    }

    loadBooksFromLocalStorage() {
        const booksJson = localStorage.getItem('books');
        return booksJson ? JSON.parse(booksJson) : [];
    }

    saveBooksToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    addBook(title, author, isbn, description) {
        this.books.push({ title, author, isbn, description });
        this.saveBooksToLocalStorage(); 
    }

    getBooks() {
        return this.books;
    }

    deleteBook(index) {
        this.books.splice(index, 1); 
        this.saveBooksToLocalStorage(); 
    }
}
