// Imports
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
import formSteps from "../../../functions/formSteps.js";
import updateOldConsole from "../../../functions/updateOldConsole.js";
import chalk from "chalk";
import ImportDeclarationHandler from "./handlers/ImportDeclarationHandler/index.js";
import CallExpressionHandler from "./handlers/CallExpressionHandler/index.js";
import FunctionDeclarationHandler from "./handlers/FunctionDeclarationHandler/index.js";
export function formatLeadingComments(comments, indent) {
    if (!comments || comments.length === 0) {
        return [];
    }
    return comments.map((comment) => ({
        type: "comment",
        content: comment.type === "CommentBlock"
            ? `${indent}/* ${comment.value} */`
            : `${indent}# ${comment.value}`,
        line: comment.loc?.start.line,
    }));
}
export default function transpileCode(code, functionIndexes) {
    process.stdout.write(`${chalk.yellowBright.italic(formSteps(functionIndexes))} Transpiling...`);
    try {
        const ast = parse(code, {
            sourceType: "module",
            plugins: ["typescript"],
            attachComment: true,
        });
        let transpiledCode = [];
        traverse.default(ast, {
            ImportDeclaration: function (path) {
                const importsDeclarationHandlerResponse = ImportDeclarationHandler(transpiledCode, path);
                if (importsDeclarationHandlerResponse.ok) {
                    transpiledCode = importsDeclarationHandlerResponse.contents;
                }
            },
            FunctionDeclaration: function (path) {
                const functionDeclarationHandlerResponse = FunctionDeclarationHandler(transpiledCode, path);
                if (functionDeclarationHandlerResponse.ok) {
                    transpiledCode = functionDeclarationHandlerResponse.contents;
                }
            },
            // ReturnStatement: function (path) {
            // 	console.log('RETURN found', path.node.start);
            // },
            // ExpressionStatement: function (path) {
            // 	console.log(path.data);
            // },
            CallExpression: function (path) {
                const callExpressionHandlerResponse = CallExpressionHandler(transpiledCode, path);
                if (callExpressionHandlerResponse.ok) {
                    transpiledCode = callExpressionHandlerResponse.contents;
                }
            },
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
        updateOldConsole(`${chalk.greenBright.italic(formSteps(functionIndexes))} Transpiled code completely.`, true);
        console.log(transpiledCode.map((c) => c.line));
        return { ok: true, code: transpiledCode };
    }
    catch (error) {
        updateOldConsole(`${chalk.redBright.italic(formSteps(functionIndexes))} Something unexpected happenend during transpilation.`);
        return { ok: false };
    }
}
//# sourceMappingURL=transpileCode.js.map