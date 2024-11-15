import Listr from 'listr';
import { ChooseAction } from "../View/View.js"
import {determineHTMLLinks, checkFilesDependencies, readFiles, removeDistFolders, minifyAndSaveJS, createDistFolder, copyAndModifyHtml} from "../Model/Model.js"
// Based on user's choice, different tasks and their progresses would be shown.
export async function runTasks() {
  const action = await ChooseAction();
  // If user chooses only to validate dependencies, following tasks would show.
  if (action === 'validate') {
    try {
      const paths =  await determineLinksHTML();
      await checkDependencies(paths);
    } catch (err) {
      console.error('An error occurred:', err);
    }
  }
  // If user chooses to validate and minify, following tasks would show.
  if (action === 'minify') {
    try {
      const paths =  await determineLinksHTML();
      const checkedPaths = await checkDependencies(paths);
      const linkedFiles = await readLinkedFiles(checkedPaths);
      await removeDistFolder();
      const minifiedJS = await minifyJS(linkedFiles);
      await createNewFileStructure(checkedPaths);
      await minifiedJSToDist(minifiedJS);
      await indexToDist();
    } catch (err) {
      console.error('An error occurred:', err);
  
    }
  }
}
 async function determineLinksHTML() {
  const tasks = new Listr([
    {
      title: 'Determine Links from the HTML File',
      task: async (ctx) => {
       ctx.paths = await determineHTMLLinks("./src/index.html");
      },
    },
  ])
  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context);
    return context.paths; // Links aus dem Kontext zurückgeben
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

async function checkDependencies(paths) {
  const tasks = new Listr([
    {
      title: 'Check Dependencies',
      task: async (ctx) => {
        ctx.dependencies = await checkFilesDependencies(paths, "./src/index.html");
      },
    },
  ]);

  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context);
    return context.dependencies; // Rückgabe der geprüften Abhängigkeiten
  } catch (err) {
    console.error('An error occurred:', err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function readLinkedFiles(checkedPaths) {
  const tasks = new Listr([
    {
      title: 'Read in linked files',
      task: async (ctx) => {
       ctx.content = await readFiles(checkedPaths);
      },
    },
  ])
  try {
    const context = {}; // Kontext für Listr erstellen
    await tasks.run(context);
    return context.content; // Rückgabe der geprüften Abhängigkeiten
  } catch (err) {
    console.error('An error occurred:', err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function removeDistFolder() {
  const tasks = new Listr([
    {
      title: 'Remove the dist folder',
      task: async () => {
        await removeDistFolders();
      },
    },
  ])
  await tasks.run().catch(err => {
    console.error('An error occurred:', err);
  });
}

 async function minifyJS(pathAndContent) {
  const tasks = new Listr([
    {
      title: 'Minify JS Code',
      task: async (ctx) => {
       ctx.minifedScript = await minifyAndSaveJS(pathAndContent);
      },
    },
  ])

  try {
    const context = {}; 
    await tasks.run(context);
    return context.minifedScript; 
  } catch (err) {
    console.error('An error occurred:', err);
    return []; // Rückgabe eines leeren Arrays im Fehlerfall
  }
}

async function createNewFileStructure(checkPaths) {
  const tasks = new Listr([
    {
      title: 'Create the file structure for the following copy task',
      task: async () => {
        await createDistFolder(checkedPaths);
      },
    },
  ])
  await tasks.run().catch(err => {
    console.error('An error occurred:', err);
  });
}

//to be changed
async function minifiedJSToDist(pathAndContent) {
  const tasks = new Listr([
    {
      title: 'Copy the minified javascript files to the dist folder',
      task: async () => {
       await minifyAndSaveJS(pathAndContent);
      },
    },
  ])
  await tasks.run().catch(err => {
    console.error('An error occurred:', err);
  });
}

async function indexToDist(paths) {
  const tasks = new Listr([
    {
      title: 'Copy index.html file into the dist folder',
      task: async () => {
       await copyAndModifyHtml(paths);
    },
  },
  ])
  await tasks.run().catch(err => {
    console.error('An error occurred:', err);
  });
}