import cfonts from 'cfonts';
import inquirer from 'inquirer';

// Banner of the CLI
export function showBanner() {
	cfonts.say('Build|Master', {
		font: 'block',              // define the font face
		align: 'left',              // define text alignment
		colors: ['system'],         // define all colors
		background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
		letterSpacing: 1,           // define letter spacing
		lineHeight: 1,              // define the line height
		space: true,                // define if the output text should have empty lines on top and on the bottom
		maxLength: '0',             // define how many character can be on one line
		gradient: false,            // define your two gradient colors
		independentGradient: false, // define if you want to recalculate the gradient for each new line
		transitionGradient: false,  // define if this is a transition between colors directly
		rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
		env: 'node'                 // define the environment cfonts is being executed in
	});
}

// User chooses action 1 or action 2.
export async function ChooseAction() {
	const answer = await inquirer.prompt({
		type: 'list',
		name: 'action',
		message: 'Should I just validate all JS dependencies \n or should I validate all JS dependencies and minify the JS Code?',
		choices: [
			{ name: 'just validate dependencies', value: 'validate' },
			{ name: 'validate and minify', value: 'minify' },
		],
		default: '',
	});
	return answer.action;
}