// Imports

import { existsSync, read, writeFileSync } from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import init, { format } from "@wasm-fmt/ruff_fmt";

// Project-Imports

import formSteps from "../../functions/formSteps.js";
import { FunctionIndexes } from "../../types/functionIndex.js";
import updateOldConsole from "../../functions/updateOldConsole.js";
import { SpikyConfig } from "../../types/SpikyConfig.js";

// Code

export default async function writeToExport(
  code: { content: string; line?: number | undefined }[],
  exportConfig: SpikyConfig["export"],
  functionIndexes: FunctionIndexes,
  overwrite: boolean,
  keepLines: boolean
): Promise<boolean> {
  process.stdout.write(
    `${chalk.yellowBright.italic(
      formSteps(functionIndexes)
    )} Writing code into chosen export format...`
  );
  const c = code.sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
  let codeOutputArray: {
    content: string;
    line?: number | undefined;
  }[] = [];
  if (keepLines) {
    for (let i = 1; i < (c[c.length - 1]?.line ?? 1); i++) {
      const cInLine = c.find((cL) => cL.line === i);
      if (!cInLine) {
        codeOutputArray.push({ content: "", line: i });
      } else {
        codeOutputArray.push(cInLine);
      }
    }
  } else {
    codeOutputArray = c;
  }
  const sortedCode = codeOutputArray.map((line) => line.content).join("\n");
  try {
    if (exportConfig.type === "python") {
      await init();
      if (existsSync(exportConfig.exportFileName)) {
        if (!overwrite) {
          updateOldConsole(
            `${chalk.yellowBright.italic(
              formSteps(functionIndexes)
            )} Waiting for your input...`
          );
          console.log("");
          const answer = await inquirer
            .prompt([
              {
                type: "confirm",
                name: "overwrite",
                message:
                  "Do you want to override the existing content of the output file?",
                default: true,
              },
            ])
            .then((answers) => answers.overwrite)
            .catch((err) => {
              console.log(err);
              return false;
            });
          if (!answer) {
            updateOldConsole(
              `${chalk.grey.italic(
                formSteps(functionIndexes)
              )} Process canceled. Not overwriting the contents of the export file.`
            );
            return false;
          }
        }

        writeFileSync(
          exportConfig.exportFileName,
          exportConfig.formatOutput
            ? format(sortedCode, undefined, exportConfig.formatterSettings)
            : sortedCode
        );
        updateOldConsole(
          `${chalk.greenBright.italic(
            formSteps(functionIndexes)
          )} Wrote transpiled code into export file`,
          true
        );
        return true;
      } else {
        writeFileSync(
          exportConfig.exportFileName,
          exportConfig.formatOutput
            ? format(sortedCode, undefined, exportConfig.formatterSettings)
            : sortedCode
        );
        updateOldConsole(
          `${chalk.greenBright.italic(
            formSteps(functionIndexes)
          )} Wrote transpiled code into export file`,
          true
        );
        return true;
      }
    } else {
      writeFileSync(
        exportConfig.folderName + "/projectbody.json",
        JSON.stringify({
          main: sortedCode,
        })
      );
      updateOldConsole(
        `${chalk.greenBright.italic(
          formSteps(functionIndexes)
        )} Wrote transpiled code into export folder`,
        true
      );
      return true;
    }
  } catch (error) {
    updateOldConsole(
      `${chalk.redBright.italic(
        formSteps(functionIndexes)
      )} During writing, something unexpected happened.`
    );
    console.log("");
    console.error(error);
    return false;
  }
}
