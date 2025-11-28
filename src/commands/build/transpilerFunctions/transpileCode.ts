// Imports

import chalk from "chalk";
import Transpiler from "ast-transpiler";

// Project-Imports

import { FunctionIndexes } from "../../../types/functionIndex.js";
import formSteps from "../../../functions/formSteps.js";
import updateOldConsole from "../../../functions/updateOldConsole.js";
import {
  ITranspiledFile,
  TranspilerConfig,
} from "../../../types/transpiler.types.js";

// Code

export default function transpileCode(
  code: string,
  functionIndexes: FunctionIndexes
): ITranspiledFile {
  process.stdout.write(
    `${chalk.yellowBright.italic(formSteps(functionIndexes))} Transpiling...`
  );
  try {
    const transpilerConfig: TranspilerConfig = {
      verbose: false,
      python: {
        FullPropertyAccessReplacements: {
          "Runloop.run": "runloop.run",
        },
        LeftPropertyAccessReplacements: {
          MotorPair: "motor_pair",
          Runloop: "runloop",
          Motor: "motor",
        },
        RightPropertyAccessReplacements: {
          MotorPair: "motor_pair",
          Runloop: "runloop",
          Motor: "motor",
        },
        CallExpressionReplacements: {
          MotorPair: "motor_pair",
        },
      },
    };
    const transpiler = new Transpiler(transpilerConfig);
    const content = transpiler.transpilePython(code) as ITranspiledFile;
    updateOldConsole(
      `${chalk.greenBright.italic(
        formSteps(functionIndexes)
      )} Transpiled code completely.`,
      true
    );
    return {
      ...content,
      content: content.content
        .replaceAll("MotorPair", "motor_pair")
        .replaceAll("Runloop", "runloop")
        .replaceAll("ColorSensor", "color_sensor"),
    };
  } catch (error) {
    updateOldConsole(
      `${chalk.redBright.italic(
        formSteps(functionIndexes)
      )} Something unexpected happenend during transpilation.`
    );
    throw new Error();
  }
}
