// Imports
import fs from 'node:fs';
// Code
export function readCodeFromInputFile(inputFile) {
    try {
        if (!fs.existsSync(inputFile))
            return { error: true, message: 'We could not find the input file' };
        const code = fs.readFileSync(inputFile).toString();
        return { error: false, code };
    }
    catch (error) {
        return { error: true, message: String(error) };
    }
}
//# sourceMappingURL=readCodeFromInputFile.js.map