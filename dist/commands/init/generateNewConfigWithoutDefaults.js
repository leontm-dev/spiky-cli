// Imports
import chalk from "chalk";
import inquirer from "inquirer";
import { writeFileSync } from "fs";
import updateOldConsole from "../../functions/updateOldConsole.js";
import formSteps from "../../functions/formSteps.js";
import { SpikyConfigDefault } from "../../types/SpikyConfig.js";
// Code
export default async function generateNewConfigWithoutDefault(functionIndexes) {
    try {
        const defaultConfig = SpikyConfigDefault;
        updateOldConsole(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Waiting for your input`);
        console.log("");
        await inquirer
            .prompt([
            {
                type: "input",
                name: "inputFileName",
                required: true,
                message: "Please specify the input file in which your are writing your typescript spiky.js code.",
            },
            {
                type: "select",
                message: "Choose a export basis, please.",
                name: "exportBasis",
                choices: [
                    {
                        name: "Project-Based",
                        value: "project",
                        description: "Should the build command update the code inside of your project directly?",
                        separator: ",",
                    },
                    {
                        name: "File-Based",
                        value: "python",
                        description: "Should the build command update a specified file that is formatted if needed?",
                        separator: ",",
                    },
                ],
            },
        ])
            .then((answers) => {
            defaultConfig.export.type = answers.exportBasis;
            defaultConfig.inputFileName = answers.inputFileName;
        })
            .catch((err) => {
            updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} Input got interupted`);
            throw err;
        });
        if (defaultConfig.export.type === "project") {
            const answer = await inquirer
                .prompt([
                {
                    name: "folderName",
                    type: "input",
                    required: true,
                    message: "Please provide the path to the folder of the exisiting spiky prime project. This folder has to be unzipped. If the folder doesn't exist, a new project will be created.",
                },
            ])
                .then((answers) => answers.folderName)
                .catch((err) => {
                updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} Unable to finish process properly.`);
                throw err;
            });
            defaultConfig.export.folderName = answer;
        }
        else if (defaultConfig.export.type === "python") {
            const answers = await inquirer
                .prompt([
                {
                    name: "exportfileName",
                    type: "input",
                    message: "",
                    required: true,
                },
                {
                    name: "formatted",
                    type: "select",
                    default: "formatted",
                    choices: [
                        {
                            separator: ",",
                            name: "Formatted",
                            description: "Your output will be formatted",
                            value: "formatted",
                        },
                        {
                            separator: ",",
                            name: "Unformatted",
                            description: "Your output will not be formatted",
                            value: "unformatted",
                        },
                    ],
                    message: "Choose how your code should look like after being transpiled",
                },
            ])
                .then((answers) => answers)
                .catch((err) => {
                updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} We could not finish the process.`);
                throw err;
            });
            defaultConfig.export.exportFileName = answers.exportfileName.incluces(".py")
                ? answers.exportfileName
                : answers.exportfileName + ".py";
            defaultConfig.export.formatOutput = answers.formatted === "formatted";
        }
        else {
            return false;
        }
        writeFileSync("config.spiky.json", JSON.stringify(defaultConfig));
        updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Created/Updated config.spiky.json`);
        return true;
    }
    catch (error) {
        updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} We couldn't complete the process successfully.`);
        return false;
    }
}
//# sourceMappingURL=generateNewConfigWithoutDefaults.js.map