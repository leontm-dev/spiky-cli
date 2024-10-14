// Imports

import { program } from 'commander';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';

// Code

export default async function helpCommand() {
	await checkForOutdatedVersion();
	program.help();
}
