import { Comment } from "@babel/types";
import { FunctionIndexes } from "../../../types/functionIndex.js";
export type SubHandlerResponse = {
    ok: true;
    contents: Contents;
} | {
    ok: false;
};
export type Content = {
    content: string;
    line?: number | undefined;
    type: ContentType;
};
export type Contents = Content[];
export type ContentType = "import" | "code" | "comment";
export declare function formatLeadingComments(comments: Comment[] | null | undefined, indent: string): Contents;
export default function transpileCode(code: string, functionIndexes: FunctionIndexes): {
    ok: true;
    code: {
        content: string;
        line?: number | undefined;
    }[];
} | {
    ok: false;
};
