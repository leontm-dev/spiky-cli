import { NodePath } from "@babel/traverse";
import { CallExpression } from "@babel/types";
import { Contents, SubHandlerResponse } from "../../../transpileCode.js";
export declare function RunloopHandler(code: Contents, prop: NodePath<CallExpression>): SubHandlerResponse;
