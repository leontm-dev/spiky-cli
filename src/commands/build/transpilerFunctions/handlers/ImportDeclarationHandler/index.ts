// Imports

// Project-Imports

import { NodePath } from '@babel/traverse';
import { PythonImports } from './ImportsRecord.js';
import { ImportDeclaration } from '@babel/types';

// Code

const onlyLeaveNotMatching = (str1: string, str2: string): string => {
	const splittedStr1 = str1.split(' ');
	const splittedStr2 = str2.split(' ');

	const left: string[] = [];

	splittedStr1.forEach(part => {
		if (!splittedStr2.includes(part)) left.push(part);
	});

	return left.join(' ');
};
export default function ImportDeclarationHandler(
	existingImports: string[],
	path: NodePath<ImportDeclaration>
): string[] {
	const copyOfExistingImports = existingImports;
	const imp = PythonImports[path.node.source.value];
	if (!imp) return copyOfExistingImports;

	if (imp.includes('from ') && imp.includes(' import ')) {
		const fromWhat = imp.split(' import ')[0]!;

		const existingImportIndex = copyOfExistingImports.findIndex(i =>
			i.includes(fromWhat)
		);
		if (existingImportIndex > -1) {
			const item = copyOfExistingImports[existingImportIndex]!;
			copyOfExistingImports.splice(existingImportIndex);
			copyOfExistingImports.push(item + ', ' + onlyLeaveNotMatching(imp, item));
		} else {
			copyOfExistingImports.push(imp);
		}
	} else {
		copyOfExistingImports.push(imp);
	}

	return copyOfExistingImports;
}
