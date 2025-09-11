#!/usr/bin/env node

// Imports

import { program } from 'commander';

// Project-Imports

import versionCommand from './commands/version.js';
import helpCommand from './commands/help.js';
import buildCommand from './commands/build/index.js';
import initCommand from './commands/init/index.js';
import updateCommand from './commands/update.js';
import { SpikyConfig } from './types/SpikyConfig.js';

// Code

// Commands

program.name('spiky');
program.description(
	'A cli tool that transpiles javascript code into python code.'
);
program.addCommand(
	program
		.createCommand('version')
		.description('Prints the current version')
		.action(versionCommand)
		.alias('v'),
	{ isDefault: false }
);
program.addCommand(
	program
		.createCommand('update')
		.alias('u')
		.description('Updates the spiky-cli to the lastest version')
		.action(updateCommand),
	{ isDefault: false }
);
program.addCommand(
	program
		.createCommand('help')
		.action(helpCommand)
		.alias('a')
		.description('Displays help information'),
	{ isDefault: true }
);
program.addCommand(
	program
		.createCommand('build')
		.description('Transpile your TypeScript Code into python.')
		.alias('b')
		.option('--overwrite', 'Instant overwriting?')
		.option('--keeplines', 'Want to keep your lines?')
		.action(buildCommand),
	{
		isDefault: false
	}
);
program.addCommand(
	program
		.createCommand('init')
		.alias('i')
		.action((str, options) => initCommand(str, options))
		.option('-y', 'Skips the prompt and uses the default values'),
	{ isDefault: false }
);

program.parse(process.argv);

export { SpikyConfig };
