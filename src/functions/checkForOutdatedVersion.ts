// Imports

import { readPackage } from 'read-pkg';
import chalk from 'chalk';

// Code

export default async function checkForOutdatedVersion() {
	const pkg = await readPackage();
	const version =
		pkg.dependencies && pkg.dependencies['spiky-cli']
			? (pkg.dependencies['spiky-cli'] as string).replace('^', '')
			: '';
	let latestVersion;
	try {
		latestVersion = await fetch('https://leontm.me/apps/spiky-cli/latest', {
			method: 'GET'
		})
			.then(res => res.json())
			.then((data: any) => data.version);
	} catch (error) {
		return;
	}
	if (version !== latestVersion) {
		const output = `
    ${chalk.white.bgRgb(209, 134, 0).bold(' NOTICE ')} Your version of spiky-cli is outdated. Please update to the latest version.
    You can update by running: ${chalk.yellowBright('npm i -g spiky-cli')}
        `;
		console.log(output);
	}
}
