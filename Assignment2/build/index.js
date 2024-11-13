console.log("Your Code should start here ... :)");

//dist ordner mit gleicher ordnerstruktur wie js anlegen
function createDistFolder() {
  //mit mkdir
}

//index html durchgehen und alle .js dateien rausfinden
function findJSFiles() {
  // fs.readFile (asynchron) und cheerio, um  Datei zu laden und alle src-Attribute der <script>-Tags zu extrahieren.
  //Gibt eine Liste mit den Pfaden zu den gefundenen .js-Dateien zurück (z. B. ['js/script1.js', 'js/test/script3.js']).
}

//im js ordner suchen und datei minifizieren + mini dateien im dist ordner speichern
function minifyAndSaveJS() {
  //Prüfe mit fs.access, ob die Datei existiert.
  //minifiziere sie mit terser und speichere den minifizierten Code
}

//Kopiert die index.html-Datei in den dist-Ordner und passt die Referenzen der JavaScript-Dateien an die minifizierten Versionen an.
function copyAndModifyHtml() {
  //Lese die index.html, ersetze alle .js-Dateireferenzen durch die Pfade im dist-Ordner (z. B. src="js/script1.js" zu src="dist/js/script1.min.js").
  //Speichere die modifizierte index.html im dist-Ordner.
}
