import { NodePath } from '@babel/traverse';
import { CallExpression } from 'typescript';
export declare const handlerRunloopHandler: (path: NodePath<CallExpression>, codeArr: {
    content: string;
    line: number;
}[]) => void;
