// Imports
// Project-Imports
import { calculateIndent } from "../../../../../../lib/calculateIndent.js";
// Code
export function RunloopHandler(code, prop) {
    if (prop.node.callee.type !== "MemberExpression" ||
        prop.node.callee.object.type !== "Identifier" ||
        prop.node.callee.object.name !== "Runloop" ||
        prop.node.callee.property.type !== "Identifier")
        return { ok: false };
    try {
        const indent = calculateIndent(prop);
        const contents = code;
        switch (prop.node.callee.property.name) {
            case "run":
                const firstArg = prop.node.arguments[0];
                if (firstArg && firstArg.type === "ArrayExpression") {
                    // Extrahiere die Namen aus dem Array
                    const functionNames = firstArg.elements
                        .map((element) => {
                        if (element && element.type === "Identifier") {
                            return element.name;
                        }
                        return null;
                    })
                        .filter((name) => name !== null);
                    contents.push({
                        content: indent +
                            "runloop.run(" +
                            functionNames.map((name) => name + "()").join(",") +
                            ")",
                        line: prop.node.loc?.start.line,
                        type: "code",
                    });
                    break;
                }
            default:
                break;
        }
        return { ok: true, contents };
    }
    catch (error) {
        return { ok: false };
    }
}
//# sourceMappingURL=Runloop.js.map