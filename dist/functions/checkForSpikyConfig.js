// Imports
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import chalk from 'chalk';
import formSteps from './formSteps.js';
import updateOldConsole from './updateOldConsole.js';
// Code
export default async function checkForSpikyConfig(functionIndexes) {
    process.stdout.write(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Searching for config.spiky.json file...`);
    try {
        if (existsSync('config.spiky.json')) {
            updateOldConsole(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Config file found. Content is being read...`);
            const content = await readFile('config.spiky.json').catch(err => {
                updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} We couldn't read the contents properly, try again later.`);
                console.log(err);
                throw err;
            });
            if (!content) {
                updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} We couldn't read the contents properly, try again later.`);
                return { found: false };
            }
            const config = JSON.parse(content.toString());
            updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} SpikyConfig found.`, true);
            return { found: true, config };
        }
        else {
            updateOldConsole(`${chalk.yellowBright.italic(formSteps(functionIndexes))} We couldn't find any config file at path: config.spiky.json`);
            return { found: false };
        }
    }
    catch (error) {
        return { found: false };
    }
}
//# sourceMappingURL=checkForSpikyConfig.js.map