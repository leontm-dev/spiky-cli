// Imports

// Project-Imports

import { NodePath } from "@babel/traverse";
import { PythonImports } from "./ImportsRecord.js";
import { ImportDeclaration } from "@babel/types";
import {
  Contents,
  formatLeadingComments,
  SubHandlerResponse,
} from "../../transpileCode.js";
import { calculateIndent } from "../../../../../lib/calculateIndent.js";

// Code

const onlyLeaveNotMatching = (str1: string, str2: string): string => {
  const splittedStr1 = str1.split(" ");
  const splittedStr2 = str2.split(" ");

  const left: string[] = [];

  splittedStr1.forEach((part) => {
    if (!splittedStr2.includes(part)) left.push(part);
  });

  return left.join(" ");
};
export default function ImportDeclarationHandler(
  code: Contents,
  path: NodePath<ImportDeclaration>
): SubHandlerResponse {
  const contents: Contents = code;
  const imp = PythonImports[path.node.source.value];
  if (!imp) return { ok: false };
  const indent = calculateIndent(path);
  contents.push(...formatLeadingComments(path.node.leadingComments, indent));

  if (imp.includes("from ") && imp.includes(" import ")) {
    const fromWhat = imp.split(" import ")[0]!;

    const existingImportIndex = contents.findIndex(
      (i) => i.content.includes(fromWhat) && i.type === "import"
    );
    if (existingImportIndex > -1) {
      const item = contents[existingImportIndex]!;
      contents.splice(existingImportIndex);
      contents.push({
        content: item.content + ", " + onlyLeaveNotMatching(imp, item.content),
        type: "import",
        line: item.line,
      });
    } else {
      contents.push({
        content: imp,
        type: "import",
        line: path.node.loc?.start.line,
      });
    }
  } else {
    contents.push({
      content: imp,
      type: "import",
      line: path.node.loc?.start.line,
    });
  }

  return { ok: true, contents };
}
