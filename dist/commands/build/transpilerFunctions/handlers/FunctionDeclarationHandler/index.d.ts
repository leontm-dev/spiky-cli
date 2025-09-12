import { NodePath } from "@babel/traverse";
import { FunctionDeclaration } from "@babel/types";
import { Contents, SubHandlerResponse } from "../../transpileCode.js";
export default function FunctionDeclarationHandler(code: Contents, path: NodePath<FunctionDeclaration>): SubHandlerResponse;
