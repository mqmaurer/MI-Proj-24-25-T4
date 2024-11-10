import inquirer from 'inquirer';
import Listr from 'listr';
import { showBanner } from '../View/View.js';

function initApp() {
  showBanner();
}

initApp();

// User chooses action 1 or action 2.
export async function ChooseAction() {
        const answer = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Should I just validate all JS dependencies \n or should I validate all JS dependencies and minify the JS Code?',
            choices: [
                {name: 'just validate dependencies', value: 'validate'},
                {name: 'validate and minify', value: 'minify'},
            ],
            default: '',
        });
        return answer.action;
}
// Base on user's choice, different tasks and their progresses would be shown.
async function runTasks() {
  const action = await ChooseAction();
 //If user chooses only to validate dependencies, following tasks would show.
  if (action === 'validate') {
    const tasks = new Listr([
      {
        title: 'Determine Links from the HTML File',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Check Dependencies',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const hasError = true;
          const userHomeDir = os.homedir();
          const directory = path.join(userHomeDir, 'myproject', 'doesNotExist.js');

          if (hasError) {
            throw new Error('Error happened - ENONENT: no such file or directory, access ' + directory);
          }
        },
      },
      {
        title: 'Read in linked files',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Remove the dist folder',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Minify JS Code',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Create the file structure for the following copy task',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Copy the minified javascript files to the dist folder',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
      {
        title: 'Copy index.html file into the dist folder',
        task: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      },
    ], {
      renderer: 'default',
    });

    await tasks.run().catch(err => {
      console.error('An error occurred:', err);
    });
  }

 //If user chooses to validate and minify, following tasks would show...(to be added here)
}

runTasks();