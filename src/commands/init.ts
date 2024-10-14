// Imports

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';
import checkForSpikyConfig from '../functions/checkForSpikyConfig.js';
import { Command } from 'commander';

// Code

export default async function initCommand(str: any, options: Command) {
	const opt = options.options;
	await checkForOutdatedVersion();
	const config = checkForSpikyConfig();
	process.stdout.write(
		`${chalk.yellowBright.italic(' [1/3] ')} Checking for already existing spiky.config.json`
	);
	let overwrite: boolean = true;
	if (config.found) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		process.stdout.write(
			`${chalk.yellowBright.italic(' [1/3] ')} Found spiky.config.json`
		);
		console.log('');
		const answer = await inquirer
			.prompt([
				{
					type: 'confirm',
					name: 'overwrite',
					message:
						'Do you want to overwrite the existing spiky.config.json?',
					default: true
				}
			])
			.then(answers => answers.overwrite)
			.catch(err => {
				process.stdout.clearLine(0);
				process.stdout.cursorTo(0);
				process.stdout.write(
					`${chalk.yellowBright.italic(' [1/1] ')} Not overwriting the found spiky.config.json`
				);
				return 'err';
			});
		if (answer === 'err') {
			return;
		}
		if (!answer) {
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			console.log(
				`${chalk.yellowBright.italic(' [1/1] ')} Not overwriting the found spiky.config.json due to user selection`
			);
		}
		overwrite = answer;
	} else {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.yellowBright.italic(' [1/3] ')} No spiky.config.json found`
		);
	}
	if (str.y == true) {
		if (overwrite) {
			process.stdout.write(
				`${chalk.yellowBright.italic(' [2/2] ')} Creating spiky.config.json`
			);
			fs.writeFile(
				'spiky.config.json',
				JSON.stringify({ folderName: null }),
				err => {
					if (err) {
						console.log(err);
						throw new Error(err.message);
					}
				}
			);
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			console.log(
				`${chalk.yellowBright.italic(' [2/2] ')} Created spiky.config.json`
			);
		} else {
			return;
		}
	} else {
		if (overwrite) {
			const answer = await inquirer
				.prompt([
					{
						type: 'input',
						message:
							'What is the name of the folder that contains your project files?',
						required: true,
						name: 'folderName'
					}
				])
				.then(answers => answers.folderName)
				.catch(err => {
					process.stdout.write(
						`${chalk.red.italic(' [2/3] ')} User didn't provide a folder name`
					);
					throw new Error("Couldn't get the folder name");
				});
			process.stdout.write(
				`${chalk.yellowBright.italic(' [2/3] ')} Searching for a folder with the name ${chalk.yellowBright(
					answer
				)}`
			);
			if (!fs.existsSync(answer)) {
				process.stdout.clearLine(0);
				process.stdout.cursorTo(0);
				console.log(
					`${chalk.red.italic(' [2/3] ')} Folder ${chalk.red(answer)} not found`
				);
				return;
			}

			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			console.log(
				`${chalk.yellowBright.italic(' [2/3] ')} Found folder ${chalk.yellowBright(answer)}`
			);
			process.stdout.write(
				`${chalk.yellowBright.italic(' [3/3] ')} Creating spiky.config.json`
			);
			fs.writeFile(
				'spiky.config.json',
				JSON.stringify({ folderName: answer }),
				err => {
					if (err) {
						console.log(err);
						throw new Error(err.message);
					}
				}
			);
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			console.log(
				`${chalk.yellowBright.italic(' [3/3] ')} Created spiky.config.json`
			);
		}
	}
}
