import { NodePath } from "@babel/traverse";
import { CallExpression } from "@babel/types";
import { Contents, SubHandlerResponse } from "../../transpileCode.js";
export default function CallExpressionHandler(code: Contents, path: NodePath<CallExpression>): SubHandlerResponse;
