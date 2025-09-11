// Imports

import { Config } from "@wasm-fmt/ruff_fmt";

// Code

export type SpikyConfig = {
  inputFileName: string;
  existingProjectFolderName: string;
  export:
    | {
        type: "project";
        folderName: string;
      }
    | {
        type: "python";
        exportFileName: string;
        formatOutput: false;
      }
    | {
        type: "python";
        exportFileName: string;
        formatOutput: true;
        formatterSettings: Config;
      };
};
