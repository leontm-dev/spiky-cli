// Imports

import { FunctionIndexes } from '../types/functionIndex.js';

// Code

export default function formSteps({ current, max }: FunctionIndexes): string {
	return ` [${current}/${max}] `;
}
