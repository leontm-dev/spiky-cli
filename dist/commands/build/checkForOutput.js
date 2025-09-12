// Imports
import chalk from 'chalk';
import formSteps from '../../functions/formSteps.js';
// Code
export default function checkForOutput(outputConfig, functionIndexes) {
    console.log(`${chalk.greenBright.italic(formSteps(functionIndexes))} Export configuration validated.`);
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
//# sourceMappingURL=checkForOutput.js.map