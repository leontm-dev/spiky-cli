// Imports

import { NodePath } from '@babel/traverse';
import { CallExpression, MemberExpression } from '@babel/types';
import { CallExpressionHandlerReturn } from '../index.js';

// Code

export function RunloopHandler(
	prop: NodePath<CallExpression>
): CallExpressionHandlerReturn {
	if (
		prop.node.callee.type !== 'MemberExpression' ||
		prop.node.callee.object.type !== 'Identifier' ||
		prop.node.callee.object.name !== 'Runloop' ||
		prop.node.callee.property.type !== 'Identifier'
	)
		return { ok: false };

	switch (prop.node.callee.property.name) {
		case 'run':
			const firstArg = prop.node.arguments[0];
			if (firstArg && firstArg.type === 'ArrayExpression') {
				// Extrahiere die Namen aus dem Array
				const functionNames = firstArg.elements
					.map(element => {
						if (element && element.type === 'Identifier') {
							return element.name;
						}
						return null;
					})
					.filter(name => name !== null);

				return {
					ok: true,
					c: {
						content:
							'runloop.run(' +
							functionNames.map(name => name + '()').join(',') +
							')',
						line: prop.node.loc?.start.line
					}
				};
			}
			return { ok: true, c: { content: 'runloop.run(' } };
		default:
			return { ok: false };
	}
}
