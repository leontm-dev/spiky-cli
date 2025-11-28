import { FunctionIndexes } from "../../types/functionIndex.js";
export declare function readCodeFromInputFile(inputFile: string, functionIndexes: FunctionIndexes): {
    error: false;
    code: string;
} | {
    error: true;
};
