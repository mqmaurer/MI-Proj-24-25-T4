// src/models/Model.js
import fs from 'fs';
import path from 'path';


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


