import { NodePath } from "@babel/traverse";
import { ImportDeclaration } from "@babel/types";
import { Contents, SubHandlerResponse } from "../../transpileCode.js";
export default function ImportDeclarationHandler(code: Contents, path: NodePath<ImportDeclaration>): SubHandlerResponse;
