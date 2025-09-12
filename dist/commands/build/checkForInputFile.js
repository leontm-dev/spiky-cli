// Imports
import { existsSync } from 'fs';
import chalk from 'chalk';
import formSteps from '../../functions/formSteps.js';
import updateOldConsole from '../../functions/updateOldConsole.js';
// Code
export default function checkForInputFile(inputFile, functionIndexes) {
    process.stdout.write(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Validating config file.`);
    try {
        if (!inputFile) {
            updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} There was no input file specified.`);
            return false;
        }
        if (existsSync(inputFile)) {
            updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Input file found!`, true);
            return true;
        }
        else {
            updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} Input file does not exist under the path your specified.`);
            return false;
        }
    }
    catch (error) {
        updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} While checking for the input file, something unexpected happened.`);
        console.log(error);
        return false;
    }
}
//# sourceMappingURL=checkForInputFile.js.map