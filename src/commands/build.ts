// Imports

import fs from 'fs';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';
import checkForSpikyConfig from '../functions/checkForSpikyConfig.js';
import chalk from 'chalk';

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
}
