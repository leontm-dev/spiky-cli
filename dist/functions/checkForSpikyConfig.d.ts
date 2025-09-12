import { type SpikyConfig } from '../types/SpikyConfig.js';
import { FunctionIndexes } from '../types/functionIndex.js';
export default function checkForSpikyConfig(functionIndexes: FunctionIndexes): Promise<{
    found: false;
} | {
    found: true;
    config: SpikyConfig;
}>;
