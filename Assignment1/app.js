// Initialisierung der MVC-Komponenten
const model = new BookModel();
const view = new BookView();
const controller = new BookController(model, view);

const lightTheme = 'css/bootstrap.light.min.css';
const darkTheme = 'css/bootstrap.dark.min.css';
        
const themeToggleButton = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

themeToggleButton.addEventListener('click', () => {
     if (themeStylesheet.getAttribute('href') === lightTheme) {
          themeStylesheet.setAttribute('href', darkTheme);
     } else {
          themeStylesheet.setAttribute('href', lightTheme);
     }
});