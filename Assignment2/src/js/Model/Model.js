// src/models/Model.js
import fs from 'fs';
import path from 'path';


const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");
const terser = require("terser");


    // Funktion, um die Ressourcen in einer HTML-Datei zu überprüfen
 export  async function determineHTMLLinks (filePath) {
        try {
            const htmlContent = await fs.promises.readFile(filePath, 'utf-8');
            const resourcePaths = [
                ...htmlContent.matchAll(/<script\s+src="(.+?)"/g),
                //...htmlContent.matchAll(/<link\s+href="(.+?)"/g),
            ].map(match => match[1]); // Extrahiere die Pfade aus den Matches
            return resourcePaths;
        } catch (error) {
            console.error('Fehler beim Lesen der HTML-Datei:', error.message);
            return [];
        }
    }

   export async function checkDependencies (resourcePaths, filePath) {
        for (const resourcePath of resourcePaths) {
            const absolutePath = path.join(path.dirname(filePath), resourcePath);
            try {
                await fs.promises.access(absolutePath);
                console.log(`Die Ressource "${resourcePath}" existiert.`);
                
            } catch (err) {
                console.error(`Fehler: Die Ressource "${resourcePath}" existiert nicht.`);
            }
        }
    }

    // Funktion, um den "dist" Ordner zu löschen
   export async function removeDistFolder () {
        try {
            await fs.promises.rmdir('dist', { recursive: true });
            console.log('Der "dist" Ordner wurde erfolgreich entfernt.');
        } catch (error) {
            console.error('Fehler beim Löschen des "dist" Ordners:', error.message);
        }
    }

    // Funktion, um Dateien zu einzulesen -- muss noch gechekt werden ob stream nicht besser
  export async function readFiles (filePaths) {
        try {
            const fileContents = [];
            for (const filePath of filePaths) {
                const content = await fs.promises.readFile(filePath, 'utf-8');
                fileContents.push({ filePath, content });
            }
            return fileContents;
        } catch (error) {
            console.error('Fehler beim Lesen der Dateien:', error.message);
        }
    }

    //TODO Fehlerbehandlung!
//ist ordnerstruktur immer so?
//sollen alle im ordner minifiziert werden oder alle in index.html?

//index html durchgehen und alle .js dateien rausfinden
async function findJSFiles() {
  // fs.readFile (asynchron) und cheerio, um  Datei zu laden und alle src-Attribute der <script>-Tags zu extrahieren.
  //Gibt eine Liste mit den Pfaden zu den gefundenen .js-Dateien zurück (z. B. ['js/script1.js', 'js/test/script3.js']).
  const htmlPath = path.join(__dirname, "../src/index.html");
  const htmlContent = await fs.readFile(htmlPath, "utf-8");

  // Entferne alle Kommentare aus dem HTML-Inhalt
  const uncommentedHtmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, "");

  // Parst das bereinigte HTML ohne Kommentare
  const $ = cheerio.load(uncommentedHtmlContent);

  const jsFiles = [];
  $("script[src]").each((_, el) => {
    jsFiles.push($(el).attr("src"));
  });

  return jsFiles;
}

//dist ordner mit gleicher ordnerstruktur wie js anlegen
async function createDistFolder(jsFiles) {
  //mit mkdir
  const distPath = path.join(__dirname, "../dist");
  await fs.mkdir(distPath, { recursive: true });

  // Erstelle Ordnerstruktur für alle JS-Dateien
  const directories = new Set();
  jsFiles.forEach((jsFile) => {
    const dir = path.join(distPath, path.dirname(jsFile));
    directories.add(dir);
  });

  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true });
  }
}

//im js ordner suchen und datei minifizieren + mini dateien im dist ordner speichern
async function minifyAndSaveJS(jsFiles) {
  //Prüfe mit fs.access, ob die Datei existiert.
  //minifiziere sie mit terser und speichere den minifizierten Code
  for (const jsFile of jsFiles) {
    const srcFilePath = path.join(__dirname, "../src", jsFile);
    const distFilePath = path.join(__dirname, "../dist", jsFile);

    try {
      const fileContent = await fs.readFile(srcFilePath, "utf-8");
      const minified = await terser.minify(fileContent);
      if (minified.code) {
        await fs.writeFile(distFilePath, minified.code);
        console.log(`Minified and saved: ${distFilePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${jsFile}: ${error.message}`);
    }
  }
}

//Kopiert die index.html-Datei in den dist-Ordner und passt die Referenzen der JavaScript-Dateien an die minifizierten Versionen an.
async function copyAndModifyHtml(jsFiles) {
  //Lese die index.html, ersetze alle .js-Dateireferenzen durch die Pfade im dist-Ordner (z. B. src="js/script1.js" zu src="dist/js/script1.min.js").
  //Speichere die modifizierte index.html im dist-Ordner.
  const htmlPath = path.join(__dirname, "../src/index.html");
  const htmlContent = await fs.readFile(htmlPath, "utf-8");
  const $ = cheerio.load(htmlContent);
  jsFiles.forEach((jsFile) => {
    $(`script[src="${jsFile}"]`).attr("src", jsFile);
  });
  const distHtmlPath = path.join(__dirname, "../dist/index.html");
  await fs.writeFile(distHtmlPath, $.html());
}


