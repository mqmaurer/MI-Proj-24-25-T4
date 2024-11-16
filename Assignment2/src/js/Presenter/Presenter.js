import Listr from 'listr';
import { ChooseAction } from "../View/View.js"
import { determineHTMLLinks, checkFilesDependencies, readFiles, removeDistFolders, minifyAndSaveJS, createDistFolder, copyAndModifyHtml } from "../Model/Model.js"

// Based on user's choice, different tasks and their progresses would be shown.
export async function runTasks() {
  const action = await ChooseAction();
  // If user chooses only to validate dependencies, following tasks would show.
  if (action === 'validate') {
    try {
      await determineLinksHTML();
      await checkDependencies();
    } catch (err) {
      console.error(err);
    }
  }
  // If user chooses to validate and minify, following tasks would show.
  if (action === 'minify') {
    try {
      await determineLinksHTML();
      await checkDependencies();
      await readLinkedFiles();
      await removeDistFolder();
      await minifyJS();
      await createNewFileStructure();
      await minifiedJSToDist();
      await indexToDist();
    } catch (err) {
      console.error(err);
    }
  }
}

const paths = async function determineLinksHTML() {
  const tasks = new Listr([
    {
      title: 'Determine Links from the HTML File',
      task: async () => {
        return determineHTMLLinks("./src/index.html");
      },
    },
  ])
  await tasks.run()
    .catch(err => {
      throw new Error('An error occurred:', err);
    }).then(result => { return result; });
}

const checkedPaths = async function checkDependencies(paths) {
  const tasks = new Listr([
    {
      title: 'Check Dependencies',
      task: async () => {
        return checkFilesDependencies(paths, ".\index.html");
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err)
  }).then(result => { return result; });
}

const pathAndContent = async function readLinkedFiles(checkedPaths) {
  const tasks = new Listr([
    {
      title: 'Read in linked files',
      task: async () => {
        return readFiles(checkedPaths);
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function removeDistFolder() {
  const tasks = new Listr([
    {
      title: 'Remove the dist folder',
      task: async () => {
        return removeDistFolders();
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

const minifiedJS = async function minifyJS(pathAndContent) {
  const tasks = new Listr([
    {
      title: 'Minify JS Code',
      task: async () => {
        return minifyAndSaveJS(pathAndContent);
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  }).then(result => { return result; });
}

async function createNewFileStructure(checkPaths) {
  const tasks = new Listr([
    {
      title: 'Create the file structure for the following copy task',
      task: async () => {
        return createDistFolder(checkedPaths);
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function minifiedJSToDist(pathAndContent) {
  const tasks = new Listr([
    {
      title: 'Copy the minified javascript files to the dist folder',
      task: async () => {
        return minifyAndSaveJS(pathAndContent);
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function indexToDist(paths) {
  const tasks = new Listr([
    {
      title: 'Copy index.html file into the dist folder',
      task: async () => {
        return copyAndModifyHtml(paths);
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}