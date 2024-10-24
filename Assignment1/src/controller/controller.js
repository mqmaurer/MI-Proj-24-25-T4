class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.displayBookList(this.model.getBooks());
       
    }

    handleAddBook(title, author, isbn, description) {
        this.model.addBook(title, author, isbn, description);
    }
        handleDeleteBook(index) {
            this.model.deleteBook(index);  // Buch aus dem Modell löschen
           
        }
    
}