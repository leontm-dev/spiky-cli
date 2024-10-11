// Imports

import { readPackage } from 'read-pkg';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';

// Command

export default async function versionCommand() {
	/* await checkForOutdatedVersion(); */
	const pkg = await readPackage();
	console.log('The current version is: v' + pkg.version);
}
