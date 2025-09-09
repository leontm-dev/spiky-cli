// Imports

import { existsSync, read, writeFileSync } from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as prettier from 'prettier';

// Project-Imports

import formSteps from '../../functions/formSteps.js';
import { FunctionIndexes } from '../../types/functionIndex.js';
import updateOldConsole from '../../functions/updateOldConsole.js';
import { SpikyConfig } from '../../types/SpikyConfig.js';

// Code

export default async function writeToExport(
	code: { content: string; line?: number | undefined }[],
	exportConfig: SpikyConfig['export'],
	functionIndexes: FunctionIndexes
): Promise<boolean> {
	process.stdout.write(
		`${chalk.yellowBright.italic(formSteps(functionIndexes))} Writing code into chosen export format...`
	);
	const c = code.sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
	const sortedCode = c.map(line => line.content).join('\n');
	try {
		if (exportConfig.type === 'python') {
			if (existsSync(exportConfig.exportFileName)) {
				updateOldConsole(
					`${chalk.yellowBright.italic(formSteps(functionIndexes))} Waiting for your input...`
				);
				console.log('');
				const answer = await inquirer
					.prompt([
						{
							type: 'confirm',
							name: 'overwrite',
							message:
								'Do you want to override the existing content of the output file?',
							default: true
						}
					])
					.then(answers => answers.overwrite)
					.catch(err => {
						console.log(err);
						return false;
					});
				if (!answer) {
					updateOldConsole(
						`${chalk.grey.italic(formSteps(functionIndexes))} Process canceled. Not overwriting the contents of the export file.`
					);
					return false;
				}
				writeFileSync(
					exportConfig.exportFileName,
					exportConfig.formatOutput
						? await prettier.format(sortedCode, { semi: false, tabWidth: 2 })
						: sortedCode
				);
				updateOldConsole(
					`${chalk.greenBright.italic(formSteps(functionIndexes))} Transpiled code sucessfully.`,
					true
				);
				return true;
			} else {
				writeFileSync(
					exportConfig.exportFileName,
					exportConfig.formatOutput
						? await prettier.format(sortedCode, { semi: false, tabWidth: 2 })
						: sortedCode
				);
				updateOldConsole(
					`${chalk.greenBright.italic(formSteps(functionIndexes))} Transpiled code sucessfully.`,
					true
				);
				return true;
			}
		} else {
			writeFileSync(
				exportConfig.folderName + '/projectbody.json',
				JSON.stringify({
					main: sortedCode
				})
			);
			updateOldConsole(
				`${chalk.greenBright.italic(formSteps(functionIndexes))} Transpiled code sucessfully.`,
				true
			);
			return true;
		}
	} catch (error) {
		updateOldConsole(
			`${chalk.redBright.italic(formSteps(functionIndexes))} During writing, something unexpected happened.`
		);
		console.log(error);
		return false;
	}
}
