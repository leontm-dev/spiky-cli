import { FunctionIndexes } from "../../types/functionIndex.js";
import { SpikyConfig } from "../../types/SpikyConfig.js";
export default function writeToExport(code: {
    content: string;
    line?: number | undefined;
}[], exportConfig: SpikyConfig["export"], functionIndexes: FunctionIndexes, overwrite: boolean, keepLines: boolean): Promise<boolean>;
