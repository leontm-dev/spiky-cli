// Imports
import fs from 'fs';
// Project-Imports
import getProject from './getProject.js';
import checkForCorrectCodebase from './checkForCorrectCodebase.js';
// Code
export default function updateProject(folderName, code) {
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
    const sortedCode = code.sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
    fs.writeFileSync(`${folderName}/projectbody.json`, JSON.stringify({ main: sortedCode.map(item => item.content).join('\n') }));
    fs.writeFileSync(`${folderName}/manifest.json`, JSON.stringify(project.manifest));
    return true;
}
//# sourceMappingURL=updateProject.js.map