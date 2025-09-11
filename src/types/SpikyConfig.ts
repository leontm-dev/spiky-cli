// Imports

import { Config } from "@wasm-fmt/ruff_fmt";

// Code

export type SpikyConfig = {
  inputFileName: string;
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
export const SpikyConfigDefault: SpikyConfig = {
	inputFileName: "input.spiky.ts",
	export: { 
		type: "python",
		exportFileName: "export.spiky.py",
		formatOutput: true,
		formatterSettings: {
			"indent_style": "tab",
			"indent_width": 4,
			"line_ending": "crlf",
			"magic_trailing_comma": "respect",
			"quote_style": "single"
		}
	}
}
