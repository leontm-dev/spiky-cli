// Imports
import { RunloopHandler } from "./BuildIns/Runloop.js";
import { MotorPairHandler } from "./BuildIns/MotorPair.js";
// Code
export default function CallExpressionHandler(code, path) {
    const callee = path.node.callee;
    if (callee.type === "MemberExpression" &&
        callee.object.type === "Identifier") {
        switch (callee.object.name) {
            case "Runloop":
                return RunloopHandler(code, path);
            case "MotorPair":
                return MotorPairHandler(code, path);
            default:
                return { ok: false };
        }
    }
    else {
        return { ok: false };
    }
}
//# sourceMappingURL=index.js.map