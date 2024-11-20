# BuildMaster CLI

A simple Node.js CLI tool to validate and minify JavaScript files. The tool checks for file dependencies in an HTML file, validates their existence, and optionally minifies the linked JavaScript files.


## Usage
Install Node.js on your system.
Make sure to run your command line with administrator permissions esp. under Windows.

Run the CLI tool using the following command:
```
npm run build
```

## Options
The tool will prompt you to choose one of the following actions:

- **Validate Dependencies:** Checks that all linked JavaScript files exist.
- **Validate and Minify:** Validates dependencies, minifies the JavaScript files, and copies them to the dist folder.

## Dependencies
The project uses the following dependencies:

- **cfonts:** For displaying the banner in the CLI.
- **inquirer:** For interactive CLI prompts.
- **listr:** For managing tasks with progress bars.
- **cheerio:** For parsing and manipulating HTML.
- **terser:** For minifying JavaScript.

Install them using:
```
npm install
```

## Development Notes
The project uses ES Modules (import/export syntax). Ensure your Node.js version supports this feature.

## Further notes
1. Reasons for organizing the MVP-Pattern, like we did
- runTasks() of Presenter.js manages all functions for the CLI. Since there aren't any View-related statments in there, it stays at Presenter.js.
- We didn't want to show all chosen tasks at all times, so we switched from 1 big Listr-function to the currently available ones. Since they all call Model-functions, they also stay at Presenter.js. Even if Listr would belong to View.