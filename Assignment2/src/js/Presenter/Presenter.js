import Listr from "listr";
import { ChooseAction } from "../View/View.js";
import {
  determineHTMLLinks,
  checkFilesDependencies,
  readFiles,
  removeDistFolders,
  minify,
  saveMinified,
  createDistFolder,
  copyAndModifyHtml,
} from "../Model/Model.js";

// Based on user's choice, different tasks and their progresses would be shown.
export async function runTasks() {
  const action = await ChooseAction();
  // If user chooses only to validate dependencies, following tasks would show.
  if (action === "validate") {
    try {
      const paths = await determineLinksHTML();
      await checkDependencies(paths);
    } catch (err) {
      console.error(err);
    }
  }
  // If user chooses to validate and minify, following tasks would show.
  if (action === "minify") {
    try {
      const paths = await determineLinksHTML();
      const checkedPaths = await checkDependencies(paths);
      const linkedFiles = await readLinkedFiles(checkedPaths);
      await removeDistFolder();
      const minifiedJS = await minifyJS(linkedFiles);
      const distPaths = await createNewFileStructure(checkedPaths);
      await minifiedJSToDist(minifiedJS, distPaths);
      await indexToDist(paths);
    } catch (err) {
      console.error(err);
    }
  }
}

async function determineLinksHTML() {
  const tasks = new Listr([
    {
      title: "Determine Links from the HTML File",
      task: async (ctx) => {
        ctx.paths = await determineHTMLLinks("./src/index.html");
      },
    },
  ]);
  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context).catch((err) => {
      console.error("An error occurred:", err);
    });
    return context.paths; // Links aus dem Kontext zurückgeben
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

async function checkDependencies(paths) {
  const tasks = new Listr([
    {
      title: "Check Dependencies",
      task: async (ctx) => {
        ctx.dependencies = await checkFilesDependencies(
          paths,
          "./src/index.html"
        );
      },
    },
  ]);

  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context).catch((err) => {
      throw new Error("An error occurred:", err);
    });
    return context.dependencies; // Rückgabe der geprüften Abhängigkeiten
  } catch (err) {
    console.error("An error occurred:", err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function readLinkedFiles(checkedPaths) {
  const tasks = new Listr([
    {
      title: "Read in linked files",
      task: async (ctx) => {
        ctx.content = await readFiles(checkedPaths);
      },
    },
  ]);
  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context).catch((err) => {
      throw new Error("An error occurred:", err);
    });
    return context.content; // Rückgabe der geprüften Abhängigkeiten
  } catch (err) {
    console.error("An error occurred:", err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function removeDistFolder() {
  const tasks = new Listr([
    {
      title: "Remove the dist folder",
      task: async () => {
        await removeDistFolders();
      },
    },
  ]);
  await tasks.run().catch((err) => {
    throw new Error("An error occurred:", err);
  });
}

async function minifyJS(pathAndContent) {
  const tasks = new Listr([
    {
      title: "Minify JS Code",
      task: async (ctx) => {
        ctx.minifedScript = await minify(pathAndContent);
      },
    },
  ]);

  try {
    const context = {};
    await tasks.run(context).catch((err) => {
      throw new Error("An error occurred:", err);
    });
    return context.minifedScript;
  } catch (err) {
    console.error("An error occurred:", err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function createNewFileStructure(paths) {
  const tasks = new Listr([
    {
      title: "Create the file structure for the following copy task",
      task: async (ctx) => {
        ctx.srcAndDist = await createDistFolder(paths);
      },
    },
  ]);
  try {
    const context = {};
    await tasks.run(context).catch((err) => {
      throw new Error("An error occurred:", err);
    });
    return context.srcAndDist;
  } catch (err) {
    console.error("An error occurred:", err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function minifiedJSToDist(contents, paths) {
  const tasks = new Listr([
    {
      title: "Copy the minified javascript files to the dist folder",
      task: async () => {
        await saveMinified(contents, paths);
      },
    },
  ]);
  await tasks.run().catch((err) => {
    throw new Error("An error occurred:", err);
  });
}

async function indexToDist() {
  const tasks = new Listr([
    {
      title: "Copy index.html file into the dist folder",
      task: async () => {
        await copyAndModifyHtml();
      },
    },
  ]);
  await tasks.run().catch((err) => {
    throw new Error("An error occurred:", err);
  });
}
