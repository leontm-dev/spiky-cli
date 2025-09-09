// Imports

import { NodePath } from '@babel/traverse';
import { CallExpression } from '@babel/types';
import { RunloopHandler } from './BuildIns/Runloop.js';
import { MotorPairHandler } from './BuildIns/MotorPair.js';

// Code

export type CallExpressionHandlerReturn =
	| { ok: true; c: { content: string; line?: number | undefined } }
	| { ok: false };
export default function CallExpressionHandler(
	variables: {}[],
	path: NodePath<CallExpression>
): CallExpressionHandlerReturn {
	const callee = path.node.callee;
	if (
		callee.type === 'MemberExpression' &&
		callee.object.type === 'Identifier'
	) {
		switch (callee.object.name) {
			case 'Runloop':
				return RunloopHandler(path);
			case 'MotorPair':
				return MotorPairHandler(path);
			default:
				return { ok: false };
		}
	} else {
		return { ok: false };
	}
}
