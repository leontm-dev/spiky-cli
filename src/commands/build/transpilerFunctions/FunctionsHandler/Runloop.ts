// Imports

import { NodePath } from '@babel/traverse';
import { CallExpression } from 'typescript';

// Code

export const handlerRunloopHandler = (
	path: NodePath<CallExpression>,
	codeArr: { content: string; line: number }[]
) => {
	if (path.type !== 'CallExpression') return;
};
