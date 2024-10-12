// Imports

import fs from 'fs';

// Code

export default function checkForSpikyConfig(): {
	found: boolean;
	folderName: any | null;
} {
	if (fs.existsSync('spiky.config.json')) {
		const content = fs.readFileSync('spiky.config.json');
		if (!content) {
			return {
				found: false,
				folderName: null
			};
		}
		const config = JSON.parse(content.toString());
		if (!config.folderName) {
			return {
				found: true,
				folderName: null
			};
		}
		return {
			found: true,
			folderName: config.folderName
		};
	} else {
		return {
			found: false,
			folderName: null
		};
	}
}
