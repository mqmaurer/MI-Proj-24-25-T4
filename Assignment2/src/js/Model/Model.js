// src/models/Model.js
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import * as terser from "terser";

// Funktion, um die Ressourcen in einer HTML-Datei zu überprüfen
export async function determineHTMLLinks(filePath) {
  try {
    const htmlContent = await fs.promises.readFile(filePath, "utf-8");
    const uncommentedHtmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, "");
    const resourcePaths = [
      ...uncommentedHtmlContent.matchAll(/<script\s+src="(.+?)"/g),
      ...htmlContent.matchAll(/<link\s+href="(.+?)"/g),
    ].map((match) => match[1]); // Extrahiere die Pfade aus den Matches
    console.log(resourcePaths);
    return resourcePaths;
  } catch (error) {
    console.error("Fehler beim Lesen der HTML-Datei:", error.message);
    return [];
  }
}

export async function checkFilesDependencies(resourcePaths, filePath) {
  const paths = [];
  for (const resourcePath of resourcePaths) {
    const absolutePath = path.join(path.dirname(filePath), resourcePath);
    try {
      await fs.promises.access(absolutePath);
      console.log(`Die Ressource "${resourcePath}" existiert.`);
      paths.push(absolutePath);
    } catch (err) {
      console.error(`Fehler: Die Ressource "${resourcePath}" existiert nicht.`);
    }
  }
  console.log(paths);
  return paths;
}

// Funktion, um den "dist" Ordner zu löschen
export async function removeDistFolders() {
  try {
    await fs.promises.rm("dist", { recursive: true });
    console.log('Der "dist" Ordner wurde erfolgreich entfernt.');
  } catch (error) {
    console.error('Fehler beim Löschen des "dist" Ordners:', error.message);
  }
}

// Funktion, um Dateien zu einzulesen -- muss noch gechekt werden ob stream nicht besser
export async function readFiles(filePaths) {
  try {
    const fileContents = [];
    for (const filePath of filePaths) {
      const content = await fs.promises.readFile(filePath, "utf-8");
      fileContents.push({ filePath, content });
    }
    return fileContents;
  } catch (error) {
    console.error("Fehler beim Lesen der Dateien:", error.message);
  }
}

export async function minify(fileData) {
  const minifiedResults = []; // Array für die Ergebnisse der Minifizierung
  for (const { filePath, content } of fileData) {
    try {
      // Minifiziere den Inhalt
      const minified = await terser.minify(content);

      if (minified.code) {
        // Speichere den minifizierten Code im Ergebnis-Array
        minifiedResults.push({
          originalFilePath: filePath,
          minifiedContent: minified.code,
        });
      }
    } catch (error) {
      console.error("Fehler beim Minifizieren der Dateien", error.message);
    }
  }
  return minifiedResults; // Rückgabe der minifizierten Ergebnisse
}

// Funktion zum Erstellen der Zielverzeichnisse und Zurückgeben der Pfade
export async function createDistFolder(paths) {
  const mapping = [];

  for (const srcPath of paths) {
    const relativePath = path.relative(path.resolve("src"), srcPath);
    const distPath = path.join(path.resolve("dist"), relativePath);

    try {
      // Verzeichnis erstellen
      const dirPath = path.dirname(distPath);
      await fs.promises.mkdir(dirPath, { recursive: true });
      console.log(`Verzeichnis erstellt: ${dirPath}`);
      await fs.promises.writeFile(distPath, "", "utf8");
      console.log(`Leere Datei erstellt: ${distPath}`);

      mapping.push({ src: srcPath, dist: distPath });
    } catch (error) {
      console.error(
        "Fehler beim Erstellen des Verzeichnisses oder der Datei:",
        error
      );
    }
  }

  return mapping; // Gibt Mapping zurück
}

// Funktion zum Speichern der minifizierten Dateien
export async function saveMinified(minified, mapping) {
  for (const file of minified) {
    // 1. Suche den passenden dist-Pfad aus dem Mapping
    const mapEntry = mapping.find((m) => m.src === file.originalFilePath);
    if (!mapEntry) {
      console.error(`Kein Mapping gefunden für: ${file.originalFilePath}`);
      continue;
    }

    const distPath = mapEntry.dist;

    try {
      await fs.promises.writeFile(distPath, file.minifiedContent, "utf8");
      console.log(`Minifizierte Datei gespeichert: ${distPath}`);
    } catch (error) {
      console.error(`Fehler beim Speichern der Datei ${distPath}:`, error);
    }
  }
}

//Kopiert die index.html-Datei in den dist-Ordner
export async function copyAndModifyHtml() {
  try {
    const indexHtmlPath = path.join(path.resolve("src"), "index.html");
    const htmlContent = await fs.promises.readFile(indexHtmlPath, "utf-8");
    const $ = cheerio.load(htmlContent);
    const distIndexHtmlPath = path.join(path.resolve("dist"), "index.html");
    await fs.promises.writeFile(distIndexHtmlPath, $.html(), "utf-8");
    console.log(
      `Die angepasste index.html wurde im dist-Ordner gespeichert: ${distIndexHtmlPath}`
    );
  } catch (error) {
    console.error("Fehler beim Aktualisieren der index.html:", error.message);
  }
}
