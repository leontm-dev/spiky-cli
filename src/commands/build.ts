// Imports

import fs from 'fs';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';
import checkForSpikyConfig from '../functions/checkForSpikyConfig.js';
import chalk from 'chalk';
import checkForCorrectCodebase from '../functions/checkForCorrectCodebase.js';
import getProject from '../functions/getProject.js';
import updateProject from '../functions/updateProject.js';

// Code

export default async function buildCommand() {
	await checkForOutdatedVersion();
	const config = checkForSpikyConfig();
	process.stdout.write(
		`${chalk.yellowBright.italic(' [1/3] ')} Searching for the config file`
	);

	if (!config.found) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.redBright.italic(' [1/3] ')} Could not find the config file!`
		);
		return;
	}

	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	console.log(
		`${chalk.greenBright.italic(' [1/3] ')} Found the config file!`
	);

	process.stdout.write(
		`${chalk.yellowBright.italic(' [2/3] ')} Transpiling the code`
	);

	// TODO: Code transpiling goes here

	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	console.log(`${chalk.greenBright.italic(' [2/3] ')} Transpiled the code!`);

	process.stdout.write(
		`${chalk.yellowBright.italic(' [3/3] ')} Writing the code to the output folder`
	);

	const outputFolder = checkForCorrectCodebase(config.folderName);
	if (outputFolder === null) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.redBright.italic(' [3/3] ')} Could not find the output folder!`
		);
		return;
	}
	if (!outputFolder) {
		fs.writeFileSync(
			`${config.folderName}/output.py`,
			'' /* TODO: Transpiled code goes here */
		);
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.redBright.italic(' [3/3] ')} Your code is ready: ${chalk.yellowBright('${config.folderName}/output.py')}`
		);
	}

	const project = getProject(config.folderName);
	if (!project) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.redBright.italic(' [3/3] ')} Could not find the project!`
		);
		return;
	}

	const updated = updateProject(
		config.folderName,
		'' /* TODO: Transpiled code goes here */
	);
	if (!updated) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		console.log(
			`${chalk.redBright.italic(' [3/3] ')} Could not update the project!`
		);
		return;
	}

	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	console.log(`${chalk.greenBright.italic(' [3/3] ')} Updated the project!`);
	return;
}
