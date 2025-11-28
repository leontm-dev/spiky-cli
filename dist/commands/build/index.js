// Imports
import chalk from "chalk";
// Project-Imports
import checkForOutdatedVersion from "../../functions/checkForOutdatedVersion.js";
import checkForSpikyConfig from "../../functions/checkForSpikyConfig.js";
import checkForInputFile from "./checkForInputFile.js";
import checkForOutput from "./checkForOutput.js";
import { readCodeFromInputFile } from "./readCodeFromInputFile.js";
import transpileCode from "./transpilerFunctions/transpileCode.js";
import writeToExport from "./writeToExport.js";
// Code
export default async function buildCommand(str, options) {
    const now = Date.now();
    const autoOverwrite = str.overwrite ?? false;
    const maxSteps = 6;
    await checkForOutdatedVersion();
    const config = await checkForSpikyConfig({ current: 1, max: maxSteps });
    if (!config.found)
        return;
    const inputFileCheck = checkForInputFile(config.config.inputFileName, {
        current: 2,
        max: maxSteps,
    });
    if (!inputFileCheck)
        return;
    const outputCheck = checkForOutput(config.config.export, {
        current: 3,
        max: maxSteps,
    });
    if (!outputCheck)
        return;
    const code = readCodeFromInputFile(config.config.inputFileName, {
        current: 4,
        max: maxSteps,
    });
    if (code.error)
        return;
    const transpiled = transpileCode(code.code, { current: 5, max: maxSteps });
    const writeCode = await writeToExport(transpiled, config.config.export, {
        current: 6,
        max: maxSteps,
    }, autoOverwrite);
    if (!writeCode)
        return;
    console.log(` =====  Building took ${chalk.yellowBright(Date.now() - now + "ms")}`);
}
//# sourceMappingURL=index.js.map