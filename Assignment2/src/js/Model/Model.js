import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import * as terser from "terser";

// Function to check resources in an HTML file
export async function determineHTMLLinks(filePath) {
  try {
    const htmlContent = await fs.promises.readFile(filePath, "utf-8");
    const uncommentedHtmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, ""); // Remove comments from file to avoid false positives
    const resourcePaths = [
      ...uncommentedHtmlContent.matchAll(/<script\s+src="(.+?)"/g), // Find all script tags
    ].map((match) => match[1]);
    return resourcePaths;
  } catch (error) {
    throw new Error("Error while determine the links:", error.message);
  }
}
//Function to check if the resources exist
export async function checkFilesDependencies(resourcePaths, filePath) {
  const paths = [];
  for (const resourcePath of resourcePaths) {
    const absolutePath = path.join(path.dirname(filePath), resourcePath);
    try {
      await fs.promises.access(absolutePath);
      paths.push(absolutePath);
    } catch (err) {
      throw new Error(`Error: The resource "${resourcePath}" does not exist.`);
    }
  }
  return paths;
}

// Function to delete the "dist" folder
export async function removeDistFolders() {
  try {
    await fs.promises.access("dist"); // Check if the "dist" folder exists
    await fs.promises.rm("dist", { recursive: true, force: true }); // Delete the "dist" folder
  } catch (error) {
    if (error.code === "ENOENT") {
      // If the "dist" folder does not exist nothing happens, because it is what we want
    } else {
      throw new Error(
        `Error while removing the "dist" folder: ${error.message}`
      );
    }
  }
}

//Function to read files
export async function readFiles(filePaths) {
  try {
    const fileContents = [];
    for (const filePath of filePaths) {
      const content = await fs.promises.readFile(filePath, "utf-8");
      fileContents.push({ filePath, content });
    }
    return fileContents;
  } catch (error) {
    throw new Error("Error while reading the files:", error.message);
  }
}

//Function to minify the files
export async function minify(fileData) {
  const minifiedResults = []; // Array for the minification results
  for (const { filePath, content } of fileData) {
    try {
      // Minify the content
      const minified = await terser.minify(content);

      if (minified.code) {
        // Save the minified code in the result array
        minifiedResults.push({
          originalFilePath: filePath,
          minifiedContent: minified.code,
        });
      }
    } catch (error) {
      throw new Error("Error while minifying the files", error.message);
    }
  }
  return minifiedResults; // Return the minified results
}

// Function to create target directories and return the paths
export async function createDistFolder(paths) {
  const mapping = []; //array for src-pathes and their corresponding dist-pathes

  for (const srcPath of paths) {
    const relativePath = path.relative(path.resolve("src"), srcPath);
    const distPath = path.join(path.resolve("dist"), relativePath);

    try {
      // Create the directory and the file
      const dirPath = path.dirname(distPath);
      await fs.promises.mkdir(dirPath, { recursive: true });
      await fs.promises.writeFile(distPath, "", "utf8");
      mapping.push({ src: srcPath, dist: distPath });
    } catch (error) {
      throw new Error("Error while creating the directory or file:", error);
    }
  }

  return mapping; // Return the mapping
}

// Function to save the minified files
export async function saveMinified(minified, mapping) {
  for (const file of minified) {
    // 1. Find the corresponding dist path from the mapping
    const mapEntry = mapping.find((m) => m.src === file.originalFilePath);
    if (!mapEntry) {
      console.error(`No mapping found for: ${file.originalFilePath}`);
      continue;
    }
    const distPath = mapEntry.dist;
    try {
      await fs.promises.writeFile(distPath, file.minifiedContent, "utf8");
    } catch (error) {
      throw new Error(`Error while saving the file ${distPath}:`, error);
    }
  }
}

//Copies the index.html file to the dist folder
export async function copyAndModifyHtml() {
  try {
    const indexHtmlPath = path.join(path.resolve("src"), "index.html");
    const htmlContent = await fs.promises.readFile(indexHtmlPath, "utf-8");
    const $ = cheerio.load(htmlContent);
    const distIndexHtmlPath = path.join(path.resolve("dist"), "index.html");
    await fs.promises.writeFile(distIndexHtmlPath, $.html(), "utf-8");
  } catch (error) {
    throw new Error("Error while updating the index.html:", error.message);
  }
}
