// Imports

import { NodePath } from '@babel/traverse';

// Code

export function calculateIndent(path: NodePath<any>): string {
	const parentFunction = path.findParent(p => p.isFunction());
	if (!parentFunction) {
		// Nicht in einer Funktion, also global. In Python wäre das Level 0.
		// Hier könnten Sie entscheiden, ob das ein Fehler ist.
		return '';
	}

	// Logisches Einrückungslevel bestimmen (zuverlässiger für Transpilierung)
	let indentationLevel = 0;
	path.findParent(p => {
		if (p.isBlockStatement()) {
			indentationLevel++;
		}
		// Stoppe die Suche, wenn wir den Körper der umgebenden Funktion erreichen
		return p.node === parentFunction.node;
	});

	return '    '.repeat(indentationLevel);
}
