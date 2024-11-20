# BuildMaster CLI

A simple Node.js CLI tool to validate and minify JavaScript files. The tool checks for file dependencies in an HTML file, validates their existence, and optionally minifies the linked JavaScript files.


## Usage

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