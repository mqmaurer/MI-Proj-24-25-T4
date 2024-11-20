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

// Based on user's choice, different tasks will be executed
export async function runTasks() {
  const action = await ChooseAction();
  // Only validation-based functions
  if (action === "validate") {
    try {
      const paths = await determineLinksHTML();
      await checkDependencies(paths);
    } catch (err) {
      console.error(err);
    }
  }
  // All tasks of the CLI will be executed
  if (action === "minify") {
    try {
      const paths = await determineLinksHTML();
      const checkedPaths = await checkDependencies(paths);
      const linkedFiles = await readLinkedFiles(checkedPaths);
      await removeDistFolder();
      const minifiedJS = await minifyJS(linkedFiles);
      const distPaths = await createNewFileStructure(checkedPaths);
      await minifiedJSToDist(minifiedJS, distPaths);
      await indexToDist();
    } catch (err) {
      console.error(err);
    }
  }
}

/* The following functions initiate a Listr-element for each function. 
This makes sure that only executed functions will be shown and if an error occurs, the CLI will stop further functions. */
async function determineLinksHTML() {
  const tasks = new Listr([
    {
      title: "Determine Links from the HTML File",
      task: async (ctx) => {
        ctx.paths = await determineHTMLLinks("./src/index.html");
      },
    },
  ]);
  const context = {};
  await tasks.run(context);
  return context.paths;
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
  const context = {};
  await tasks.run(context);
  return context.dependencies;
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
  const context = {};
  await tasks.run(context);
  return context.content;
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
  await tasks.run()
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
  const context = {};
  await tasks.run(context);
  return context.minifedScript;
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
  const context = {};
  await tasks.run(context)
  return context.srcAndDist;
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
  await tasks.run();
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
  await tasks.run();
}
