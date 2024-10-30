// Initialise the MVC components
const model = new BookModel();
const view = new BookView();
const controller = new BookController(model, view);