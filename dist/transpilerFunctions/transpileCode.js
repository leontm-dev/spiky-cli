// Imports
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { PythonImports } from './ImportsRecord.js';
// Code
export const transpileCode = (code) => {
    const ast = parse(code, { sourceType: 'module', plugins: ['typescript'] });
    const imports = [];
    let mainFunctionIncluded = false;
    const transpiledCode = [];
    traverse.default(ast, {
        ImportDeclaration: function (path) {
            const imp = PythonImports[path.node.source.value];
            if (!imp)
                return;
            transpiledCode.push({ content: imp, line: path.node.loc?.start.line });
        },
        FunctionExpression: function (path) {
            console.log('FUNKTION Expression', path.node.id?.name);
        },
        FunctionDeclaration: function (path) {
            if (path.node.async && path.node.id?.name === 'main') {
                mainFunctionIncluded = true;
            }
            console.log(path.node.params);
            transpiledCode.push({
                content: `${path.node.async ? 'async' : ''} def ${path.node.id?.name}(${path.node.params
                    .map(param => {
                    if (param.type === 'Identifier') {
                        let paramName = param.name;
                        let paramType = '';
                        // Prüfen, ob eine Typ-Annotation vorhanden ist
                        if (param.typeAnnotation &&
                            param.typeAnnotation.type === 'TSTypeAnnotation') {
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
                                    if (typeNode.type === 'TSTypeReference' &&
                                        typeNode.typeName.type === 'Identifier') {
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
            const callee = path.node.callee;
            // Prüft auf Aufrufe wie "Runloop.run(...)"
            if (callee.type === 'MemberExpression' &&
                callee.object.type === 'Identifier' &&
                callee.object.name === 'Runloop' &&
                callee.property.type === 'Identifier' &&
                callee.property.name === 'run') {
                // Das erste Argument ist das Array mit den Funktionsnamen
                const firstArg = path.node.arguments[0];
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
                    transpiledCode.push({
                        content: 'runloop.run(' +
                            functionNames.map(name => name + '()').join(',') +
                            ')',
                        line: path.node.loc?.start.line
                    });
                }
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
    // console.log(imports.join('\n'));
    return transpiledCode;
};
//# sourceMappingURL=transpileCode.js.map