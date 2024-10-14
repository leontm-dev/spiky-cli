// Imports

import { readPackage } from 'read-pkg';
import chalk from 'chalk';
import { exec } from 'child_process';

// Project-Imports

import checkForOutdatedVersion from '../functions/checkForOutdatedVersion.js';

// Code

export default async function updateCommand() {
	const version = await checkForOutdatedVersion();
	if (!version) {
		const pkg = await readPackage();
		if (!pkg || !pkg.dependencies) {
			console.log(
				`${chalk.red.italic(' [1/1] ')} Could not read package.json!`
			);
			return;
		}
		const spiky = pkg.dependencies['spiky-js'];
		if (!spiky) {
			console.log(
				`${chalk.red.italic(' [1/1] ')} Could not find spiky-js in package.json!`
			);
			return;
		}

		exec('npm i spiky.js', (error, stdout, stderr) => {
			if (error) {
				console.log(
					`${chalk.red.italic(' [1/1] ')} Could not update spiky-js!`
				);
				return;
			}

			console.log(
				`${chalk.green.italic(' [1/1] ')} Updated spiky-js to the latest version!`
			);
		});
		exec('npm i spiky-cli', (error, stdout, stderr) => {
			if (error) {
				console.log(
					`${chalk.red.italic(' [1/1] ')} Could not update spiky-cli!`
				);
				return;
			}
			console.log(
				`${chalk.green.italic(' [1/1] ')} Updated spiky-cli to the latest version!`
			);
		});
	}

	console.log(`${chalk.yellow.italic(' [1/1] ')} No need for an update!`);
}
