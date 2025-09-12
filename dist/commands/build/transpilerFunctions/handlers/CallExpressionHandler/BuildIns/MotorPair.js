// Imports
// Project-Imports
import { calculateIndent } from "../../../../../../lib/calculateIndent.js";
// Code
export function MotorPairHandler(code, prop) {
    if (prop.node.callee.type !== "MemberExpression" ||
        prop.node.callee.object.type !== "Identifier" ||
        prop.node.callee.object.name !== "MotorPair" ||
        prop.node.callee.property.type !== "Identifier")
        return { ok: false };
    try {
        const indent = calculateIndent(prop);
        const contents = code;
        switch (prop.node.callee.property.name) {
            case "move":
                const filteredArgs = prop.node.arguments.filter((arg) => arg.type === "NumericLiteral");
                contents.push({
                    content: indent +
                        "motor_pair.move(" +
                        filteredArgs
                            .map((arg, index) => {
                            if (index > 1) {
                                if (index === 2) {
                                    return "velocity=" + arg.value;
                                }
                                else if (index === 3) {
                                    return "acceleration=" + arg.value;
                                }
                            }
                            else {
                                return arg.value;
                            }
                        })
                            .join(", ") +
                        ")",
                    line: prop.node.loc?.start.line,
                    type: "code",
                });
                break;
            default:
                break;
        }
        return { ok: true, contents: contents };
    }
    catch (error) {
        return { ok: false };
    }
}
//# sourceMappingURL=MotorPair.js.map