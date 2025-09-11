// Imports

import { writeFileSync } from "fs";
import chalk from "chalk";

// Project-Imports

import formSteps from "../../functions/formSteps.js";
import { FunctionIndexes } from "../../types/functionIndex.js";
import updateOldConsole from "../../functions/updateOldConsole.js";
import { SpikyConfigDefault } from "../../types/SpikyConfig.js";

// Code

export default function generateNewConfigWithDefault(
  functionIndexes: FunctionIndexes
) {
  try {
    updateOldConsole(
      `${chalk.yellowBright.italic(
        formSteps(functionIndexes)
      )} Writing config.spiky.json file...`
    );
    writeFileSync("config.spiky.json", JSON.stringify(SpikyConfigDefault));
    updateOldConsole(
      `${chalk.greenBright.italic(
        formSteps(functionIndexes)
      )} Applied the default values to the config.spiky.json file`,
      true
    );
  } catch (error) {
    updateOldConsole(
      `${chalk.redBright.italic(
        formSteps(functionIndexes)
      )} We couldn't update the config file.`,
      true
    );
  }
}
