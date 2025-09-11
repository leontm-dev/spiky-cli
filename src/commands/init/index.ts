// Imports

import inquirer from "inquirer";
import chalk from "chalk";

// Project-Imports

import checkForOutdatedVersion from "../../functions/checkForOutdatedVersion.js";
import checkForSpikyConfig from "../../functions/checkForSpikyConfig.js";
import { Command } from "commander";
import formSteps from "../../functions/formSteps.js";
import updateOldConsole from "../../functions/updateOldConsole.js";
import generateNewConfigWithDefault from "./generateNewConfigWithDefault.js";
import generateNewConfigWithoutDefault from "./generateNewConfigWithoutDefaults.js";

// Code

export default async function initCommand(str: any, options: Command) {
  const now = Date.now();
  const maxSteps = 3;
  await checkForOutdatedVersion();
  const config = await checkForSpikyConfig({ current: 1, max: maxSteps });
  let overwrite: boolean = true;
  process.stdout.write(
    `${chalk.yellowBright.italic(
      formSteps({ current: 2, max: maxSteps })
    )} Moving to step 2`
  );
  if (config.found) {
    updateOldConsole(
      `${chalk.yellowBright.italic(
        formSteps({ current: 2, max: maxSteps })
      )} Waiting for your input...`
    );
    console.log("");
    const answer = await inquirer
      .prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "Do you want to overwrite the existing config.spiky.json?",
          default: true,
        },
      ])
      .then((answers) => answers.overwrite)
      .catch((err) => {
        return false;
      });
    if (!answer) {
      updateOldConsole(
        `${chalk.greenBright.italic(
          formSteps({ current: 2, max: maxSteps })
        )} Not overwriting the current config.spiky.json file. Skipping step 3`
      );
      overwrite = answer;
      console.log(
        ` =====  Initializing took ${chalk.yellowBright(
          Date.now() - now + "ms"
        )}`
      );
      return;
    } else {
      updateOldConsole(
        `${chalk.grey.italic(
          formSteps({ current: 2, max: maxSteps })
        )} Overwriting the existing config.spiky.json file.`,
        true
      );
    }
  }
  if (str.y == true) {
    generateNewConfigWithDefault({ current: 3, max: maxSteps });
  } else {
    await generateNewConfigWithoutDefault({ current: 3, max: maxSteps });
  }
  console.log(
    ` =====  Initializing took ${chalk.yellowBright(Date.now() - now + "ms")}`
  );
}
