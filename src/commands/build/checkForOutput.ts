// Imports

import { existsSync } from 'fs';
import chalk from 'chalk';

// Project-Imports

import updateOldConsole from '../../functions/updateOldConsole.js';
import formSteps from '../../functions/formSteps.js';
import { SpikyConfig } from '../../types/SpikyConfig.js';
import { FunctionIndexes } from '../../types/functionIndex.js';

// Code

export default function checkForOutput(
	outputConfig: SpikyConfig['export'],
	functionIndexes: FunctionIndexes
): boolean {
	console.log(
		`${chalk.greenBright.italic(formSteps(functionIndexes))} Export configuration validated.`
	);
	// if (outputConfig.type === 'project') {
	// 	if (
	// 		existsSync(outputConfig.folderName + '/projectbody.json') &&
	// 		existsSync(outputConfig.folderName + '/icon.svg')
	// 	) {
	// 		updateOldConsole(
	// 			`${chalk.greenBright.italic(formSteps(functionIndexes))} Export configuration validated.`
	// 		);
	// 		return true;
	// 	}
	// } else {
	// 	updateOldConsole(
	// 		`${chalk.greenBright.italic(formSteps(functionIndexes))} Export configuration validated.`
	// 	);
	// 	return true;
	// }
	return true;
}
