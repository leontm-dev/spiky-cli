// Imports

import fs from 'fs';

// Code

export default function checkForCorrectCodebase(
	folderName: string
): boolean | null {
	if (!fs.existsSync(folderName)) {
		return null;
	}

	const files = fs.readdirSync(folderName);
	if (files.includes('manifest.json')) {
		const manifest = JSON.parse(
			fs.readFileSync(`${folderName}/manifest.json`, 'utf-8')
		);

		if (manifest.type === undefined || manifest.type !== 'python') {
			return false;
		}
		if (manifest.id === undefined || manifest.id === '') {
			return false;
		}
		return true;
	} else {
		return false;
	}
}
