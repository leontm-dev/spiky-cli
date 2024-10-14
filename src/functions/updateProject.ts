// Imports

import fs from 'fs';

// Project-Imports

import getProject from './getProject.js';
import checkForCorrectCodebase from './checkForCorrectCodebase.js';

// Code

export default function updateProject(folderName: string, code: string) {
	if (!fs.existsSync(folderName)) {
		return null;
	}
	if (!checkForCorrectCodebase(folderName)) {
		return null;
	}
	const project = getProject(folderName);
	if (project === null) {
		return null;
	}

	project.manifest.lastsaved = new Date();

	fs.writeFileSync(
		`${folderName}/projectbody.json`,
		JSON.stringify({ main: code })
	);
	fs.writeFileSync(
		`${folderName}/manifest.json`,
		JSON.stringify(project.manifest)
	);

	return true;
}
