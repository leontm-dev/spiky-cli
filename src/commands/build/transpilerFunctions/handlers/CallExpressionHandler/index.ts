// Imports

import { NodePath } from "@babel/traverse";
import { CallExpression } from "@babel/types";
import { RunloopHandler } from "./BuildIns/Runloop.js";
import { MotorPairHandler } from "./BuildIns/MotorPair.js";
import { Contents, SubHandlerResponse } from "../../transpileCode.js";

// Code

export default function CallExpressionHandler(
  code: Contents,
  path: NodePath<CallExpression>
): SubHandlerResponse {
  const callee = path.node.callee;
  if (
    callee.type === "MemberExpression" &&
    callee.object.type === "Identifier"
  ) {
    switch (callee.object.name) {
      case "Runloop":
        return RunloopHandler(code, path);
      case "MotorPair":
        return MotorPairHandler(code, path);
      default:
        return { ok: false };
    }
  } else {
    return { ok: false };
  }
}
