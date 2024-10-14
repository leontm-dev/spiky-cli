// Imports

import fs from 'fs';

// Project-Imports

import checkForCorrectCodebase from './checkForCorrectCodebase.js';

// Code

export default function getProject(folderName: string) {
	if (!fs.existsSync(folderName)) {
		return null;
	}

	if (!checkForCorrectCodebase(folderName)) {
		return null;
	}

	const output: {
		manifest: Record<string, any>;
		projectbody: { main: string };
		icon: string;
	} = { manifest: {}, projectbody: { main: '' }, icon: '' };

	const files = fs.readdirSync(folderName);
	for (const file of files) {
		if (file === 'manifest.json') {
			output.manifest = JSON.parse(
				fs.readFileSync(`${folderName}/manifest.json`, 'utf-8')
			);
		} else if (file === 'projectbody.json') {
			output.projectbody = JSON.parse(
				fs.readFileSync(`${folderName}/projectbody.json`, 'utf-8')
			);
		} else if (file === 'icon.png') {
			output.icon = fs.readFileSync(`${folderName}/icon.png`, 'utf-8');
		}
	}
	return output;
}
