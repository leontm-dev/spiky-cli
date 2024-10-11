#!/usr/bin/env node

// Imports

import args from 'args';

// Project-Imports

import versionCommand from './commands/version.js';
import helpCommand from './commands/help.js';
import buildCommand from './commands/build.js';
import initCommand from './commands/init.js';

// Code

// Commands
args.command('version', 'Prints the current version', versionCommand, ['v'])
	.command('help', 'Displays help information', helpCommand)
	.command('build', 'Builds the project', buildCommand, ['b'])
	.command('init', 'Initializes the project', initCommand)
	// Options
	.option(
		['H', 'help'],
		'Outputs usage info about the correct and successful usage of the spiky-cli',
		undefined,
		helpCommand
	)
	// Examples
	.example('The current version is: vX.X.X', 'spiky version');

const flags = args.parse(process.argv, {
	help: false,
	version: false,
	name: 'spiky',
	mainColor: 'yellowBright',
	subColor: 'grey',
	mri: {}
});
