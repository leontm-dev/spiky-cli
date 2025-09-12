// Imports
import fs from 'fs';
import chalk from 'chalk';
import formSteps from '../../functions/formSteps.js';
import updateOldConsole from '../../functions/updateOldConsole.js';
// Code
export function readCodeFromInputFile(inputFile, functionIndexes) {
    process.stdout.write(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Extracting code from input file.`);
    try {
        const code = fs.readFileSync(inputFile, 'utf-8').toString();
        updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Code extracted!`, true);
        return { error: false, code };
    }
    catch (error) {
        updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} While reading the code from the input file, an unexpected error occured.`);
        console.log(error);
        return { error: true };
    }
}
//# sourceMappingURL=readCodeFromInputFile.js.map