// Imports

import { NodePath } from '@babel/traverse';
import { CallExpression, MemberExpression } from '@babel/types';
import { CallExpressionHandlerReturn } from '../index.js';

// Code

export function MotorPairHandler(
	prop: NodePath<CallExpression>
): CallExpressionHandlerReturn {
	if (
		prop.node.callee.type !== 'MemberExpression' ||
		prop.node.callee.object.type !== 'Identifier' ||
		prop.node.callee.object.name !== 'MotorPair' ||
		prop.node.callee.property.type !== 'Identifier'
	)
		return { ok: false };

	const parentFunction = prop.findParent(p => p.isFunction());
	if (!parentFunction) {
		// Nicht in einer Funktion, also global. In Python wäre das Level 0.
		// Hier könnten Sie entscheiden, ob das ein Fehler ist.
		return { ok: false };
	}

	// Logisches Einrückungslevel bestimmen (zuverlässiger für Transpilierung)
	let indentationLevel = 0;
	prop.findParent(p => {
		// Zähle, wie viele Blöcke wir "tief" sind
		if (p.isBlockStatement()) {
			indentationLevel++;
		}
		// Stoppe die Suche, wenn wir den Körper der umgebenden Funktion erreichen
		return p.node === parentFunction.node;
	});

	// Erzeuge den Einrückungs-String für Python (hier mit 4 Leerzeichen)
	const indent = '    '.repeat(indentationLevel);
	switch (prop.node.callee.property.name) {
		case 'move':
			const filteredArgs = prop.node.arguments.filter(
				arg => arg.type === 'NumericLiteral'
			);
			return {
				ok: true,
				c: {
					content:
						indent + // Füge die Einrückung hinzu
						'motor_pair.move(' +
						filteredArgs.map(arg => (arg as any).value).join(',') +
						')',
					line: prop.node.loc?.start.line
				}
			};
		default:
			return { ok: false };
	}
}
