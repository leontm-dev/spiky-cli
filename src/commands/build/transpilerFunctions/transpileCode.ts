// Imports

import traverse from '@babel/traverse';
import { parse } from '@babel/parser';

// Project-Imports

import { PythonImports } from './handlers/ImportDeclarationHandler/ImportsRecord.js';
import { FunctionIndexes } from '../../../types/functionIndex.js';
import formSteps from '../../../functions/formSteps.js';
import updateOldConsole from '../../../functions/updateOldConsole.js';
import chalk from 'chalk';
import ImportDeclarationHandler from './handlers/ImportDeclarationHandler/index.js';
import CallExpressionHandler from './handlers/CallExpressionHandler/index.js';

// Code

export default function transpileCode(
	code: string,
	functionIndexes: FunctionIndexes
):
	| {
			ok: true;
			code: { content: string; line?: number | undefined }[];
	  }
	| { ok: false } {
	process.stdout.write(
		`${chalk.yellowBright.italic(formSteps(functionIndexes))} Transpiling...`
	);
	try {
		const ast = parse(code, { sourceType: 'module', plugins: ['typescript'] });
		let imports: string[] = [];
		const transpiledCode: { line?: number; content: string }[] = [];

		traverse.default(ast, {
			ImportDeclaration: function (path) {
				const nowImports = ImportDeclarationHandler(imports, path);
				imports = nowImports;
			},
			FunctionDeclaration: function (path) {
				transpiledCode.push({
					content: `${path.node.async ? 'async' : ''} def ${path.node.id?.name}(${path.node.params
						.map(param => {
							if (param.type === 'Identifier') {
								let paramName = param.name;
								let paramType = '';

								// Prüfen, ob eine Typ-Annotation vorhanden ist
								if (
									param.typeAnnotation &&
									param.typeAnnotation.type === 'TSTypeAnnotation'
								) {
									const typeNode = param.typeAnnotation.typeAnnotation;

									// Mappen von TS-Typen zu Python-Typen
									switch (typeNode.type) {
										case 'TSStringKeyword':
											paramType = 'str';
											break;
										case 'TSNumberKeyword':
											paramType = 'int'; // oder float
											break;
										case 'TSBooleanKeyword':
											paramType = 'bool';
											break;
										case 'TSNullKeyword':
											paramType = 'null';
											break;
										case 'TSObjectKeyword':
											paramType = 'object';
											break;
										// Fügen Sie hier weitere Typ-Mappings hinzu
										default:
											// Für komplexere Typen wie Klassen
											if (
												typeNode.type === 'TSTypeReference' &&
												typeNode.typeName.type === 'Identifier'
											) {
												paramType = typeNode.typeName.name;
											}
											break;
									}
								}

								// Python-Syntax: "param_name: param_type"
								return paramType ? `${paramName}: ${paramType}` : paramName;
							}
							return '';
						})
						.join(', ')}):`,
					line: path.node.loc?.start.line
				});
			},
			// ReturnStatement: function (path) {
			// 	console.log('RETURN found', path.node.start);
			// },
			// ExpressionStatement: function (path) {
			// 	console.log(path.data);
			// },
			CallExpression: function (path) {
				const code = CallExpressionHandler([], path);
				if (code.ok) {
					transpiledCode.push(code.c);
				}
			}
			// MemberExpression: function (path) {
			// 	if (path.node.object.type === 'Identifier') {
			// 		switch (path.node.object.name) {
			// 			case 'Runloop':
			// 				if (path.node.property.type === 'Identifier') {
			// 					if (path.node.property.name === 'run') {
			// 						transpiledCode.push({
			// 							content: 'runloop.run(',
			// 							line: 1
			// 						});
			// 					}
			// 				}
			// 		}
			// 	}
			// }
			// ArrowFunctionExpression: function (path) {
			// 	console.log('FUNCTION Arrow');
			// }
		});
		updateOldConsole(
			`${chalk.greenBright.italic(formSteps(functionIndexes))} Transpiled code completely.`,
			true
		);
		transpiledCode.push({
			content: '# Imports',
			line: -1 * imports.length + 1
		});
		imports.forEach((imp, index) =>
			transpiledCode.push({ content: imp, line: -1 * index + 1 })
		);
		return { ok: true, code: transpiledCode };
	} catch (error) {
		updateOldConsole(
			`${chalk.redBright.italic(formSteps(functionIndexes))} Something unexpected happenend during transpilation.`
		);
		return { ok: false };
	}
}
