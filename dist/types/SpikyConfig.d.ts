import { Config } from "@wasm-fmt/ruff_fmt";
export type SpikyConfig = {
    inputFileName: string;
    export: {
        type: "project";
        folderName: string;
    } | {
        type: "python";
        exportFileName: string;
        formatOutput: false;
    } | {
        type: "python";
        exportFileName: string;
        formatOutput: true;
        formatterSettings: Config;
    };
};
export declare const SpikyConfigDefault: SpikyConfig;
