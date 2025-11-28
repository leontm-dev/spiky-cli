// Imports
import { existsSync, writeFileSync } from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import init, { format } from "@wasm-fmt/ruff_fmt";
// Project-Imports
import formSteps from "../../functions/formSteps.js";
import updateOldConsole from "../../functions/updateOldConsole.js";
import { PythonImports } from "../../types/imports.record.js";
// Code
export default async function writeToExport(code, exportConfig, functionIndexes, overwrite) {
    process.stdout.write(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Writing code into chosen export format...`);
    try {
        const imports = code.imports
            .map((i) => {
            const record = PythonImports[i.path];
            return record ?? `# Import at ${i.path} not found.`;
        })
            .join("\n");
        const fullCode = imports + "\n\n" + code.content;
        if (exportConfig.type === "python") {
            await init();
            if (existsSync(exportConfig.exportFileName)) {
                if (!overwrite) {
                    updateOldConsole(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Waiting for your input...`);
                    console.log("");
                    const answer = await inquirer
                        .prompt([
                        {
                            type: "confirm",
                            name: "overwrite",
                            message: "Do you want to override the existing content of the output file?",
                            default: true,
                        },
                    ])
                        .then((answers) => answers.overwrite)
                        .catch((err) => {
                        console.log(err);
                        return false;
                    });
                    if (!answer) {
                        updateOldConsole(`${chalk.grey.italic(formSteps(functionIndexes))} Process canceled. Not overwriting the contents of the export file.`);
                        return false;
                    }
                }
                writeFileSync(exportConfig.exportFileName, exportConfig.formatOutput
                    ? format(fullCode, undefined, exportConfig.formatterSettings)
                    : fullCode);
                updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Wrote transpiled code into export file`, true);
                return true;
            }
            else {
                writeFileSync(exportConfig.exportFileName, exportConfig.formatOutput
                    ? format(fullCode, undefined, exportConfig.formatterSettings)
                    : fullCode);
                updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Wrote transpiled code into export file`, true);
                return true;
            }
        }
        else {
            writeFileSync(exportConfig.folderName + "/projectbody.json", JSON.stringify({
                main: fullCode,
            }));
            updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Wrote transpiled code into export folder`, true);
            return true;
        }
    }
    catch (error) {
        updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} During writing, something unexpected happened.`);
        console.log("");
        console.error(error);
        return false;
    }
}
//# sourceMappingURL=writeToExport.js.map