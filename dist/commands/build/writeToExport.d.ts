import { FunctionIndexes } from "../../types/functionIndex.js";
import { SpikyConfig } from "../../types/SpikyConfig.js";
import { ITranspiledFile } from "../../types/transpiler.types.js";
export default function writeToExport(code: ITranspiledFile, exportConfig: SpikyConfig["export"], functionIndexes: FunctionIndexes, overwrite: boolean): Promise<boolean>;
